namespace Store.Domain.Entities;
public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Completed,
    Cancelled
}
public sealed class Order
{
    public int Id { get; set; }
    public required string CustomerName { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string Address { get; set; }
    public DateTime CreatedAt { get; set; }
    public OrderStatus Status { get; set; }
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
