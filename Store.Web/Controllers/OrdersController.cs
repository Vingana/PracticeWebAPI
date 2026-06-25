using Microsoft.AspNetCore.Mvc;
using Store.Services.Models.Order;
using Store.Services.OrderService;
namespace Store.Web.Controllers;
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        IEnumerable<OrderDto> orders =
            await _orderService.GetAllAsync();
        return Ok(orders);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        OrderDto? order =
            await _orderService.GetByIdAsync(id);
        if (order is null)
        {
            return NotFound();
        }
        return Ok(order);
    }
    [HttpGet("by-email")]
    public async Task<IActionResult> GetByEmail(
        [FromQuery] string email)
    {
        IEnumerable<OrderDto> orders =
            await _orderService.GetByEmailAsync(email);
        return Ok(orders);
    }
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateOrderDto dto)
    {
        OrderDto created =
            await _orderService.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created);
    }
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        UpdateOrderStatusDto dto)
    {
        bool updated =
            await _orderService.UpdateStatusAsync(id, dto);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }
}
