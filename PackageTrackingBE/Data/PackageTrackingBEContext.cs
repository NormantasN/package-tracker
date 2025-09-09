using PackageTrackingBE.Models;
using Microsoft.EntityFrameworkCore;


namespace PackageTrackingBE.Data
{
    public class PackageTrackingBEContext : DbContext
    {
        public PackageTrackingBEContext(DbContextOptions<PackageTrackingBEContext> options) : base(options)
        {
        }
        public DbSet<Package> Packages { get; set; }
        public DbSet<StatusHistory> StatusHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Package>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TrackingNumber).IsRequired().HasMaxLength(50);
                entity.HasIndex(e => e.TrackingNumber).IsUnique();
                entity.Property(e => e.SenderName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.RecipientName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.CurrentStatus).HasConversion<string>();
            });

            modelBuilder.Entity<StatusHistory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Package)
                      .WithMany(p => p.StatusHistory)
                      .HasForeignKey(e => e.PackageId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.Status).HasConversion<string>();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
