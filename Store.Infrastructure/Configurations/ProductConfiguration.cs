using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Domain.Entities;
namespace Store.Infrastructure.Configurations;
public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);
        builder.Property(x => x.Price)
            .HasPrecision(18, 2);
        builder.Property(x => x.Description)
            .HasMaxLength(2000);
        builder.Property(x => x.ImageURL)
            .HasMaxLength(500);
    }
}
