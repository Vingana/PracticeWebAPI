namespace Store.Services.Models.Order;
public sealed class CreateOrderDto
{
    public required string CustomerName { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string Address { get; set; }
    public List<OrderItemDto> Items { get; set; } = [];
}
