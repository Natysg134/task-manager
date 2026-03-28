using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  public DbSet<TaskItem> Tasks => Set<TaskItem>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
      modelBuilder.Entity<TaskItem>(entity =>
      {
          entity.HasKey(t => t.Id);
          entity.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(500);
          entity.Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
      });

      // Seed data
      modelBuilder.Entity<TaskItem>().HasData(
          new TaskItem { Id = 1, Title = "Set up the project", Details = "Initialize repository and solution", IsCompleted = true, CreatedAt = DateTime.UtcNow, DueAt = DateTime.UtcNow.AddDays(-7) },
          new TaskItem { Id = 2, Title = "Build the API", Details = "Implement controllers and services", IsCompleted = true, CreatedAt = DateTime.UtcNow.AddDays(-6), DueAt = DateTime.UtcNow.AddDays(-2) },
          new TaskItem { Id = 3, Title = "Connect frontend to API", Details = "Wire UI to backend endpoints", IsCompleted = false, CreatedAt = DateTime.UtcNow.AddDays(-3), DueAt = DateTime.UtcNow.AddDays(2) },
          new TaskItem { Id = 4, Title = "Write the README", Details = "Documentation for setup and usage", IsCompleted = false, CreatedAt = DateTime.UtcNow.AddDays(-1), DueAt = DateTime.UtcNow.AddDays(5) },
          new TaskItem { Id = 5, Title = "Send GitHub Repo", Details = "Create PR from feature branch", IsCompleted = false, CreatedAt = DateTime.UtcNow, DueAt = DateTime.UtcNow.AddDays(1) }
      );
  }
}