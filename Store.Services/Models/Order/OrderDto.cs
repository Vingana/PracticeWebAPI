using Store.Domain.Entities;
namespace Store.Services.Models.Order;
public sealed class OrderDto
{
    public int Id { get; set; }
    public required string CustomerName { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string Address { get; set; }
    public DateTime CreatedAt { get; set; }
    public OrderStatus Status { get; set; }
    public List<OrderItemDto> Items { get; set; } = [];
}
