using PackageTrackingBE.DTOs;

namespace PackageTrackingBE.Services
{
    public interface IPackageService
    {
        Task<List<PackageDto>> GetAllPackagesAsync();
        Task<PackageDto?> GetPackageByIdAsync(int id);
        Task<PackageDto?> GetPackageByTrackingNumberAsync(string trackingNumber);
        Task<PackageDto> CreatePackageAsync(CreatePackageDto createPackageDto);
        Task<PackageDto?> UpdatePackageStatusAsync(int id, UpdateStatusDto updateStatusDto);
        Task<List<PackageDto>> GetFilteredPackagesAsync(string? trackingNumber, string? status);
        string GenerateTrackingNumber();
    }
}
