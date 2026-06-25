using Store.Services.Models.Order;
namespace Store.Services.OrderService;
public interface IOrderService
{
    Task<IEnumerable<OrderDto>> GetAllAsync();
    Task<OrderDto?> GetByIdAsync(int id);
    Task<IEnumerable<OrderDto>> GetByEmailAsync(string email);
    Task<OrderDto> CreateAsync(CreateOrderDto dto);
    Task<bool> UpdateStatusAsync(
        int orderId,
        UpdateOrderStatusDto dto);
}
