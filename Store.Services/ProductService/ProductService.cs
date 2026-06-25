using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Infrastructure;
using Store.Services.Models.Product;
namespace Store.Services.ProductService;
public sealed class ProductService : IProductService
{
    private readonly ApplicationContext _context;
    public ProductService(ApplicationContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        return await _context.Products
            .Include(product => product.Category)
            .Select(product => new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Quantity = product.Quantity,
                Price = product.Price,
                ImageURL = product.ImageURL,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name
            })
            .ToListAsync();
    }
    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(product => product.Category)
            .Where(product => product.Id == id)
            .Select(product => new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Quantity = product.Quantity,
                Price = product.Price,
                ImageURL = product.ImageURL,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name
            })
            .FirstOrDefaultAsync();
    }
    public async Task<ProductDto> CreateAsync(
        CreateProductDto dto)
    {
        Product product = new()
        {
            Name = dto.Name,
            Description = dto.Description,
            Quantity = dto.Quantity,
            Price = dto.Price,
            ImageURL = dto.ImageURL,
            CategoryId = dto.CategoryId
        };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return await GetByIdAsync(product.Id)
            ?? throw new Exception("Product was not created.");
    }
    public async Task<bool> UpdateAsync(
        int id,
        UpdateProductDto dto)
    {
        Product? product =
            await _context.Products.FindAsync(id);
        if (product is null)
        {
            return false;
        }
        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Quantity = dto.Quantity;
        product.Price = dto.Price;
        product.ImageURL = dto.ImageURL;
        product.CategoryId = dto.CategoryId;
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> DeleteAsync(int id)
    {
        Product? product =
            await _context.Products.FindAsync(id);
        if (product is null)
        {
            return false;
        }
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}
