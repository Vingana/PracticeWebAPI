using Store.Domain.Entities;
namespace Store.Services.Models.Order;
public sealed class UpdateOrderStatusDto
{
    public OrderStatus Status { get; set; }
}
