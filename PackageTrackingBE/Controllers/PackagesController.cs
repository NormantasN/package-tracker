using Microsoft.AspNetCore.Mvc;
using PackageTrackingBE.DTOs;
using PackageTrackingBE.Services;

namespace PackageTrackingBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService _packageService;
        private readonly ILogger<PackagesController> _logger;

        public PackagesController(IPackageService packageService, ILogger<PackagesController> logger)
        {
            _packageService = packageService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<PackageDto>>> GetPackages([FromQuery] string? trackingNumber, [FromQuery] string? status)
        {
            try
            {
                List<PackageDto> packages;

                if (!string.IsNullOrEmpty(trackingNumber) || !string.IsNullOrEmpty(status))
                {
                    packages = await _packageService.GetFilteredPackagesAsync(trackingNumber, status);
                }
                else
                {
                    packages = await _packageService.GetAllPackagesAsync();
                }

                return Ok(packages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving packages");
                return StatusCode(500, "An error occurred while retrieving packages");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PackageDto>> GetPackage(int id)
        {
            try
            {
                var package = await _packageService.GetPackageByIdAsync(id);

                if (package == null)
                {
                    return NotFound($"Package with ID {id} not found");
                }

                return Ok(package);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving package with ID {PackageId}", id);
                return StatusCode(500, "An error occurred while retrieving the package");
            }
        }

        [HttpGet("tracking/{trackingNumber}")]
        public async Task<ActionResult<PackageDto>> GetPackageByTrackingNumber(string trackingNumber)
        {
            try
            {
                var package = await _packageService.GetPackageByTrackingNumberAsync(trackingNumber);

                if (package == null)
                {
                    return NotFound($"Package with tracking number {trackingNumber} not found");
                }

                return Ok(package);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving package with tracking number {TrackingNumber}", trackingNumber);
                return StatusCode(500, "An error occurred while retrieving the package");
            }
        }

        [HttpPost]
        public async Task<ActionResult<PackageDto>> CreatePackage(CreatePackageDto createPackageDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var package = await _packageService.CreatePackageAsync(createPackageDto);

                return CreatedAtAction(nameof(GetPackage), new { id = package.Id }, package);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating package");
                return StatusCode(500, "An error occurred while creating the package");
            }
        }

        [HttpPut("{id:int}/status")]
        public async Task<ActionResult<PackageDto>> UpdatePackageStatus(int id, UpdateStatusDto updateStatusDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var package = await _packageService.UpdatePackageStatusAsync(id, updateStatusDto);

                if (package == null)
                {
                    return NotFound($"Package with ID {id} not found");
                }

                return Ok(package);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Invalid status transition for package {PackageId}", id);
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Invalid status value for package {PackageId}", id);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating package status for package {PackageId}", id);
                return StatusCode(500, "An error occurred while updating the package status");
            }
        }
    }
}