namespace PackageTrackingBE.DTOs
{
    public class PackageDto
    {
        public int Id { get; set; }
        public string TrackingNumber { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string SenderAddress { get; set; } = string.Empty;
        public string SenderPhone { get; set; } = string.Empty;
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientAddress { get; set; } = string.Empty;
        public string RecipientPhone { get; set; } = string.Empty;
        public string CurrentStatus { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public List<StatusHistoryDto> StatusHistory { get; set; } = new();
        public List<string> AvailableStatusTransitions { get; set; } = new();

    }
}
