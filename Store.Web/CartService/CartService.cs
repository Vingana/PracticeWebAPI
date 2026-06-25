using System.Text.Json;
using Store.Services.Models.Cart;
namespace Store.Web.CartService;
public sealed class CartService : ICartService
{
    private const string CartKey = "Cart";
    private readonly IHttpContextAccessor _httpContextAccessor;
    public CartService(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    public CartDto GetCart()
    {
        string? json =
            _httpContextAccessor.HttpContext?
            .Session.GetString(CartKey);
        if (string.IsNullOrEmpty(json))
        {
            return new CartDto();
        }
        return JsonSerializer.Deserialize<CartDto>(json)
               ?? new CartDto();
    }
    public void AddItem(AddCartItemDto dto)
    {
        CartDto cart = GetCart();
        CartItemDto? item =
            cart.Items.FirstOrDefault(x =>
                x.ProductId == dto.ProductId);
        if (item is not null)
        {
            item.Quantity += dto.Quantity;
        }
        else
        {
            cart.Items.Add(
                new CartItemDto
                {
                    ProductId = dto.ProductId,
                    ProductName = dto.ProductName,
                    Price = dto.Price,
                    Quantity = dto.Quantity
                });
        }
        SaveCart(cart);
    }
    public void UpdateQuantity(
        int productId,
        int quantity)
    {
        CartDto cart = GetCart();
        CartItemDto? item =
            cart.Items.FirstOrDefault(x =>
                x.ProductId == productId);
        if (item is null)
        {
            return;
        }
        if (quantity <= 0)
        {
            cart.Items.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }
        SaveCart(cart);
    }
    public void RemoveItem(int productId)
    {
        CartDto cart = GetCart();
        CartItemDto? item =
            cart.Items.FirstOrDefault(x =>
                x.ProductId == productId);
        if (item is not null)
        {
            cart.Items.Remove(item);
        }
        SaveCart(cart);
    }
    public void Clear()
    {
        _httpContextAccessor.HttpContext?
            .Session.Remove(CartKey);
    }
    private void SaveCart(CartDto cart)
    {
        string json =
            JsonSerializer.Serialize(cart);
        _httpContextAccessor.HttpContext?
            .Session.SetString(CartKey, json);
    }
}
