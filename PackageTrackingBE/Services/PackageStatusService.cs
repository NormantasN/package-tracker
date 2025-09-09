using PackageTrackingBE.Models;
using System.ComponentModel;

namespace PackageTrackingBE.Services
{
    public class PackageStatusService : IPackageStatusService
    {
        private readonly Dictionary<PackageStatus, List<PackageStatus>> _statusTransitions = new()
        {
            { PackageStatus.Created, new List<PackageStatus> { PackageStatus.Sent, PackageStatus.Canceled } },
            { PackageStatus.Sent, new List<PackageStatus> { PackageStatus.Accepted, PackageStatus.Returned, PackageStatus.Canceled } },
            { PackageStatus.Returned, new List<PackageStatus> { PackageStatus.Sent, PackageStatus.Canceled } },
            { PackageStatus.Accepted, new List<PackageStatus>() }, // Final status
            { PackageStatus.Canceled, new List<PackageStatus>() }  // Final status
        };

        public List<PackageStatus> GetAvailableStatusTransitions(PackageStatus currentStatus)
        {
            return _statusTransitions.TryGetValue(currentStatus, out var transitions)
                ? transitions
                : new List<PackageStatus>();
        }
        public bool IsValidStatusTransition(PackageStatus currentStatus, PackageStatus newStatus)
        {
            return GetAvailableStatusTransitions(currentStatus).Contains(newStatus);
        }

        public string GetStatusDescription(PackageStatus status)
        {
            var fieldInfo = status.GetType().GetField(status.ToString());
            var attributes = fieldInfo?.GetCustomAttributes(typeof(DescriptionAttribute), false);

            if (attributes?.Length > 0 && attributes[0] is DescriptionAttribute descriptionAttribute)
            {
                return descriptionAttribute.Description;
            }

            return status.ToString();
        }
    }
}
