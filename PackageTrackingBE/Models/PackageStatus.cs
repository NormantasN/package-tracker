using System.ComponentModel;

namespace PackageTrackingBE.Models
{
    public enum PackageStatus
    {
        [Description("Created")]
        Created = 0,

        [Description("Sent")]
        Sent = 1,

        [Description("Returned")]
        Returned = 2,

        [Description("Accepted")]
        Accepted = 3,

        [Description("Canceled")]
        Canceled = 4
    }
}
