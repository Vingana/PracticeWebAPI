using Microsoft.AspNetCore.Mvc;
using Store.Services.Models.Cart;
using Store.Web.CartService;
namespace Store.Web.Controllers;
[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;
    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }
    [HttpGet]
    public IActionResult GetCart()
    {
        CartDto cart = _cartService.GetCart();
        return Ok(cart);
    }
    [HttpPost("add")]
    public IActionResult AddItem(
        AddCartItemDto dto)
    {
        _cartService.AddItem(dto);
        return Ok(_cartService.GetCart());
    }
    [HttpPut("update")]
    public IActionResult UpdateQuantity(
        int productId,
        int quantity)
    {
        _cartService.UpdateQuantity(
            productId,
            quantity);
        return Ok(_cartService.GetCart());
    }
    [HttpDelete("remove/{productId}")]
    public IActionResult RemoveItem(
        int productId)
    {
        _cartService.RemoveItem(productId);
        return Ok(_cartService.GetCart());
    }
    [HttpDelete("clear")]
    public IActionResult Clear()
    {
        _cartService.Clear();
        return NoContent();
    }
}
