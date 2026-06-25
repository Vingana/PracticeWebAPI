using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Infrastructure;
using Store.Services.Exceptions;
using Store.Services.Models.Order;
namespace Store.Services.OrderService;
public sealed class OrderService : IOrderService
{
    private readonly ApplicationContext _context;
    public OrderService(ApplicationContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<OrderDto>> GetAllAsync()
    {
        return await _context.Orders
            .Include(order => order.Items)
            .ThenInclude(item => item.Product)
            .Select(order => new OrderDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Email = order.Email,
                Address = order.Address,
                CreatedAt = order.CreatedAt,
                Status = order.Status,
                Items = order.Items
                    .Select(item => new OrderItemDto
                    {
                        ProductId = item.ProductId,
                        ProductName = item.Product.Name,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    })
                    .ToList()
            })
            .ToListAsync();
    }
    public async Task<OrderDto?> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(order => order.Items)
            .ThenInclude(item => item.Product)
            .Where(order => order.Id == id)
            .Select(order => new OrderDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Email = order.Email,
                Address = order.Address,
                CreatedAt = order.CreatedAt,
                Status = order.Status,
                Items = order.Items
                    .Select(item => new OrderItemDto
                    {
                        ProductId = item.ProductId,
                        ProductName = item.Product.Name,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();
    }
    public async Task<IEnumerable<OrderDto>> GetByEmailAsync(string email)
    {
        return await _context.Orders
            .Include(order => order.Items)
            .ThenInclude(item => item.Product)
            .Where(order => order.Email == email)
            .Select(order => new OrderDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Email = order.Email,
                Address = order.Address,
                CreatedAt = order.CreatedAt,
                Status = order.Status,
                Items = order.Items
                    .Select(item => new OrderItemDto
                    {
                        ProductId = item.ProductId,
                        ProductName = item.Product.Name,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    })
                    .ToList()
            })
            .ToListAsync();
    }
    public async Task<OrderDto> CreateAsync(CreateOrderDto dto)
    {
        using var transaction =
            await _context.Database.BeginTransactionAsync();
        try
        {
            Order order = new()
            {
                CustomerName = dto.CustomerName,
                Phone = dto.Phone,
                Email = dto.Email,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow,
                Status = OrderStatus.Pending
            };
            foreach (OrderItemDto item in dto.Items)
            {
                Product? product = await _context.Products
                    .FirstOrDefaultAsync(product =>
                        product.Id == item.ProductId);
                if (product is null)
                {
                    throw new BusinessValidationException(
                        $"Product {item.ProductId} not found.", nameof(item.ProductId));
                }
                if (product.Quantity < item.Quantity)
                {
                    throw new BusinessValidationException(
                        $"Not enough stock for {product.Name}.", nameof(item.Quantity));
                }
                product.Quantity -= item.Quantity;
                order.Items.Add(new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return await GetByIdAsync(order.Id)
                ?? throw new Exception(
                    "Order was not created.");
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<bool> UpdateStatusAsync(
        int orderId,
        UpdateOrderStatusDto dto)
    {
        Order? order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == orderId);
        if (order is null)
        {
            return false;
        }
        if (dto.Status == OrderStatus.Cancelled && order.Status != OrderStatus.Cancelled)
        {
            foreach (OrderItem item in order.Items)
            {
                Product? product = await _context.Products.FindAsync(item.ProductId);
                if (product is not null)
                {
                    product.Quantity += item.Quantity;
                }
            }
        }
        else if (order.Status == OrderStatus.Cancelled && dto.Status != OrderStatus.Cancelled)
        {
            foreach (OrderItem item in order.Items)
            {
                Product? product = await _context.Products.FindAsync(item.ProductId);
                if (product is null)
                {
                    throw new BusinessValidationException(
                        $"Product {item.ProductId} not found.", nameof(item.ProductId));
                }
                if (product.Quantity < item.Quantity)
                {
                    throw new BusinessValidationException(
                        $"Not enough stock for {product.Name} to restore this order.", nameof(item.Quantity));
                }
            }
            foreach (OrderItem item in order.Items)
            {
                Product? product = await _context.Products.FindAsync(item.ProductId);
                if (product is not null)
                {
                    product.Quantity -= item.Quantity;
                }
            }
        }
        order.Status = dto.Status;
        await _context.SaveChangesAsync();
        return true;
    }
}
