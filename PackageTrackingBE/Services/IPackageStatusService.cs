using PackageTrackingBE.Models;

namespace PackageTrackingBE.Services
{
    public interface IPackageStatusService
    {
        List<PackageStatus> GetAvailableStatusTransitions(PackageStatus currentStatus);
        bool IsValidStatusTransition(PackageStatus currentStatus, PackageStatus newStatus);
        string GetStatusDescription(PackageStatus status);
    }
}
