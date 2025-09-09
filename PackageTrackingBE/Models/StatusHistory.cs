namespace PackageTrackingBE.Models
{
    public class StatusHistory
    {
        public int Id { get; set; }
        public int PackageId { get; set; }
        public Package Package { get; set; } = null!;
        public PackageStatus Status { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? Notes { get; set; }
    }
}
