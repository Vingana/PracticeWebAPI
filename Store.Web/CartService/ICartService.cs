using Store.Services.Models.Cart;
namespace Store.Web.CartService;
public interface ICartService
{
    CartDto GetCart();
    void AddItem(AddCartItemDto dto);
    void UpdateQuantity(
        int productId,
        int quantity);
    void RemoveItem(int productId);
    void Clear();
}
