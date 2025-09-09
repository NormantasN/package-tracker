using Microsoft.AspNetCore.Mvc;
using PackageTrackingBE.Models;
using PackageTrackingBE.Services;

namespace PackageTrackingBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly IPackageStatusService _statusService;

        public StatusController(IPackageStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet("all")]
        public ActionResult<Dictionary<string, string>> GetAllStatuses()
        {
            var statuses = Enum.GetValues<PackageStatus>()
                .ToDictionary(
                    status => status.ToString(),
                    status => _statusService.GetStatusDescription(status)
                );

            return Ok(statuses);
        }

        [HttpGet("{status}/transitions")]
        public ActionResult<List<string>> GetAvailableTransitions(string status)
        {
            if (!Enum.TryParse<PackageStatus>(status, out var packageStatus))
            {
                return BadRequest("Invalid status");
            }

            var transitions = _statusService.GetAvailableStatusTransitions(packageStatus)
                .Select(s => s.ToString())
                .ToList();

            return Ok(transitions);
        }
    }
}