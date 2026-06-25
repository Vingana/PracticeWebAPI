namespace Store.Services.Models.Cart;
public sealed class CartDto
{
    public List<CartItemDto> Items { get; set; } = [];
    public decimal TotalPrice =>
        Items.Sum(x => x.Price * x.Quantity);
}
