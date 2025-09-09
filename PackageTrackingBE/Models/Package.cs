using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PackageTrackingBE.Models
{
    public class Package
    {
        public int Id { get; set; }

        [Required]
        public string TrackingNumber { get; set; } = string.Empty;

        // Sender information

        [Required]
        public string SenderName { get; set; } = string.Empty;

        [Required]
        public string SenderAddress { get; set; } = string.Empty;

        [Required]
        public string SenderPhone { get; set; } = string.Empty;

        // Recipient information

        [Required]
        public string RecipientName { get; set; } = string.Empty;

        [Required]
        public string RecipientAddress { get; set; } = string.Empty;

        [Required]
        public string RecipientPhone { get; set; } = string.Empty;

        // Status information
        public PackageStatus CurrentStatus { get; set; } = PackageStatus.Created;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        public List<StatusHistory> StatusHistory { get; set; } = new();

    }
}