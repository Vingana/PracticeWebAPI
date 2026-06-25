using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Infrastructure;
using Store.Services.Models.Category;
namespace Store.Services.CategoryService;
public sealed class CategoryService : ICategoryService
{
    private readonly ApplicationContext _context;
    public CategoryService(ApplicationContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        return await _context.Categories
            .Select(category => new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                ProductsCount = category.Products.Count
            })
            .ToListAsync();
    }
    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        return await _context.Categories
            .Where(category => category.Id == id)
            .Select(category => new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                ProductsCount = category.Products.Count
            })
            .FirstOrDefaultAsync();
    }
    public async Task<CategoryDto> CreateAsync(
        CreateCategoryDto dto)
    {
        Category category = new()
        {
            Name = dto.Name
        };
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            ProductsCount = 0
        };
    }
    public async Task<bool> UpdateAsync(
        int id,
        UpdateCategoryDto dto)
    {
        Category? category =
            await _context.Categories.FindAsync(id);
        if (category is null)
        {
            return false;
        }
        category.Name = dto.Name;
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> DeleteAsync(int id)
    {
        Category? category =
            await _context.Categories.FindAsync(id);
        if (category is null)
        {
            return false;
        }
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }
}
