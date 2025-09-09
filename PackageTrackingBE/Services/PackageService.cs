using Microsoft.EntityFrameworkCore;
using PackageTrackingBE.Data;
using PackageTrackingBE.DTOs;
using PackageTrackingBE.Models;

namespace PackageTrackingBE.Services
{
    public class PackageService : IPackageService
    {
        private readonly PackageTrackingBEContext _context;
        private readonly IPackageStatusService _statusService;

        public PackageService(PackageTrackingBEContext context, IPackageStatusService statusService)
        {
            _context = context;
            _statusService = statusService;
        }

        public async Task<List<PackageDto>> GetAllPackagesAsync()
        {
            var packages = await _context.Packages
                .Include(p => p.StatusHistory)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return packages.Select(MapToDto).ToList();
        }

        public async Task<PackageDto?> GetPackageByIdAsync(int id)
        {
            var package = await _context.Packages
                .Include(p => p.StatusHistory)
                .FirstOrDefaultAsync(p => p.Id == id);

            return package == null ? null : MapToDto(package);
        }

        public async Task<PackageDto?> GetPackageByTrackingNumberAsync(string trackingNumber)
        {
            var package = await _context.Packages
                .Include(p => p.StatusHistory)
                .FirstOrDefaultAsync(p => p.TrackingNumber == trackingNumber);

            return package == null ? null : MapToDto(package);
        }

        public async Task<PackageDto> CreatePackageAsync(CreatePackageDto createPackageDto)
        {
            var package = new Package
            {
                TrackingNumber = GenerateTrackingNumber(),
                SenderName = createPackageDto.SenderName,
                SenderAddress = createPackageDto.SenderAddress,
                SenderPhone = createPackageDto.SenderPhone,
                RecipientName = createPackageDto.RecipientName,
                RecipientAddress = createPackageDto.RecipientAddress,
                RecipientPhone = createPackageDto.RecipientPhone,
                CurrentStatus = PackageStatus.Created,
                CreatedAt = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow
            };

            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            var statusHistory = new StatusHistory
            {
                PackageId = package.Id,
                Status = PackageStatus.Created,
                Timestamp = DateTime.UtcNow,
                Notes = "Package created"
            };

            _context.StatusHistory.Add(statusHistory);
            await _context.SaveChangesAsync();

            var savedPackage = await GetPackageByIdAsync(package.Id);
            return savedPackage!;
        }

        public async Task<PackageDto?> UpdatePackageStatusAsync(int id, UpdateStatusDto updateStatusDto)
        {
            var package = await _context.Packages
                .Include(p => p.StatusHistory)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (package == null) return null;

            if (!Enum.TryParse<PackageStatus>(updateStatusDto.status, out var newStatus))
                throw new ArgumentException("Invalid status");

            if (!_statusService.IsValidStatusTransition(package.CurrentStatus, newStatus))
                throw new InvalidOperationException($"Invalid status transition from {package.CurrentStatus} to {newStatus}");

            package.CurrentStatus = newStatus;
            package.LastUpdated = DateTime.UtcNow;

            var statusHistory = new StatusHistory
            {
                PackageId = package.Id,
                Status = newStatus,
                Timestamp = DateTime.UtcNow,
                Notes = updateStatusDto.Notes
            };

            _context.StatusHistory.Add(statusHistory);
            await _context.SaveChangesAsync();

            return MapToDto(package);
        }

        public async Task<List<PackageDto>> GetFilteredPackagesAsync(string? trackingNumber, string? status)
        {
            var query = _context.Packages.Include(p => p.StatusHistory).AsQueryable();

            if (!string.IsNullOrEmpty(trackingNumber))
            {
                query = query.Where(p => p.TrackingNumber.Contains(trackingNumber));
            }

            if (!string.IsNullOrEmpty(status) && Enum.TryParse<PackageStatus>(status, out var statusEnum))
            {
                query = query.Where(p => p.CurrentStatus == statusEnum);
            }

            var packages = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();
            return packages.Select(MapToDto).ToList();
        }

        public string GenerateTrackingNumber()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
            var random = new Random().Next(1000, 9999);
            return $"PKG{timestamp}{random}";
        }

        private PackageDto MapToDto(Package package)
        {
            var availableTransitions = _statusService.GetAvailableStatusTransitions(package.CurrentStatus)
                .Select(s => s.ToString())
                .ToList();

            return new PackageDto
            {
                Id = package.Id,
                TrackingNumber = package.TrackingNumber,
                SenderName = package.SenderName,
                SenderAddress = package.SenderAddress,
                SenderPhone = package.SenderPhone,
                RecipientName = package.RecipientName,
                RecipientAddress = package.RecipientAddress,
                RecipientPhone = package.RecipientPhone,
                CurrentStatus = _statusService.GetStatusDescription(package.CurrentStatus),
                CreatedAt = package.CreatedAt,
                LastUpdated = package.LastUpdated,
                StatusHistory = package.StatusHistory
                    .OrderBy(h => h.Timestamp)
                    .Select(h => new StatusHistoryDto
                    {
                        Id = h.Id,
                        Status = _statusService.GetStatusDescription(h.Status),
                        Timestamp = h.Timestamp,
                        Notes = h.Notes
                    }).ToList(),
                AvailableStatusTransitions = availableTransitions
            };
        }
    }
}
