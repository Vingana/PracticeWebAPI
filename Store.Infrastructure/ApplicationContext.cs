using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Infrastructure.Seed;
namespace Store.Infrastructure;
public sealed class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options)
    {
    }
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
        CategorySeed.Seed(modelBuilder);
        ProductSeed.Seed(modelBuilder);
    }
}
