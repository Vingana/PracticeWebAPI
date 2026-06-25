using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Domain.Entities;
namespace Store.Infrastructure.Configurations;
public sealed class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.UnitPrice)
            .HasPrecision(18, 2);
        builder.HasOne(x => x.Product)
            .WithMany()
            .HasForeignKey(x => x.ProductId);
    }
}
