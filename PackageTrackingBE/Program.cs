using Microsoft.EntityFrameworkCore;
using PackageTrackingBE.Data;
using PackageTrackingBE.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PackageTrackingBEContext>(options =>
    options.UseInMemoryDatabase("PackageTrackingBEDb"));

builder.Services.AddScoped<IPackageService, PackageService>();
builder.Services.AddScoped<IPackageStatusService, PackageStatusService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddLogging();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PackageTrackingBEContext>();
    SeedData(context);
}

app.Run();

static void SeedData(PackageTrackingBEContext context)
{
    if (context.Packages.Any()) return;

    var packages = new[]
    {
        new PackageTrackingBE.Models.Package
        {
            TrackingNumber = "PKG1701234567001",
            SenderName = "John Smith",
            SenderAddress = "123 Main St, New York, NY 10001",
            SenderPhone = "+1-555-0101",
            RecipientName = "Jane Doe",
            RecipientAddress = "456 Oak Ave, Los Angeles, CA 90210",
            RecipientPhone = "+1-555-0102",
            CurrentStatus = PackageTrackingBE.Models.PackageStatus.Created,
            CreatedAt = DateTime.UtcNow.AddDays(-2),
            LastUpdated = DateTime.UtcNow.AddDays(-2)
        },
        new PackageTrackingBE.Models.Package
        {
            TrackingNumber = "PKG1701234567002",
            SenderName = "Alice Johnson",
            SenderAddress = "789 Pine St, Chicago, IL 60601",
            SenderPhone = "+1-555-0201",
            RecipientName = "Bob Wilson",
            RecipientAddress = "321 Elm St, Houston, TX 77001",
            RecipientPhone = "+1-555-0202",
            CurrentStatus = PackageTrackingBE.Models.PackageStatus.Sent,
            CreatedAt = DateTime.UtcNow.AddDays(-1),
            LastUpdated = DateTime.UtcNow.AddHours(-6)
        },
        new PackageTrackingBE.Models.Package
        {
            TrackingNumber = "PKG1701234567003",
            SenderName = "Mike Davis",
            SenderAddress = "654 Cedar Rd, Miami, FL 33101",
            SenderPhone = "+1-555-0301",
            RecipientName = "Sarah Brown",
            RecipientAddress = "987 Birch Ln, Seattle, WA 98101",
            RecipientPhone = "+1-555-0302",
            CurrentStatus = PackageTrackingBE.Models.PackageStatus.Accepted,
            CreatedAt = DateTime.UtcNow.AddDays(-3),
            LastUpdated = DateTime.UtcNow.AddHours(-2)
        }
    };

    context.Packages.AddRange(packages);
    context.SaveChanges();

    var statusHistories = new[]
    {
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 1,
            Status = PackageTrackingBE.Models.PackageStatus.Created,
            Timestamp = DateTime.UtcNow.AddDays(-2),
            Notes = "Package created"
        },
        
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 2,
            Status = PackageTrackingBE.Models.PackageStatus.Created,
            Timestamp = DateTime.UtcNow.AddDays(-1),
            Notes = "Package created"
        },
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 2,
            Status = PackageTrackingBE.Models.PackageStatus.Sent,
            Timestamp = DateTime.UtcNow.AddHours(-6),
            Notes = "Package dispatched from warehouse"
        },
        
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 3,
            Status = PackageTrackingBE.Models.PackageStatus.Created,
            Timestamp = DateTime.UtcNow.AddDays(-3),
            Notes = "Package created"
        },
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 3,
            Status = PackageTrackingBE.Models.PackageStatus.Sent,
            Timestamp = DateTime.UtcNow.AddDays(-2).AddHours(-12),
            Notes = "Package sent to destination"
        },
        new PackageTrackingBE.Models.StatusHistory
        {
            PackageId = 3,
            Status = PackageTrackingBE.Models.PackageStatus.Accepted,
            Timestamp = DateTime.UtcNow.AddHours(-2),
            Notes = "Package delivered and accepted"
        }
    };

    context.StatusHistory.AddRange(statusHistories);
    context.SaveChanges();
}