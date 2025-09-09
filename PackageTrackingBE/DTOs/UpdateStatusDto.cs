using System.ComponentModel.DataAnnotations;

namespace PackageTrackingBE.DTOs
{
    public class UpdateStatusDto
    {
        [Required]
        public string status { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
