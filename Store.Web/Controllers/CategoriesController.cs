using Microsoft.AspNetCore.Mvc;
using Store.Services.CategoryService;
using Store.Services.Models.Category;
namespace Store.Web.Controllers;
[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        IEnumerable<CategoryDto> categories =
            await _categoryService.GetAllAsync();
        return Ok(categories);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        CategoryDto? category =
            await _categoryService.GetByIdAsync(id);
        if (category is null)
        {
            return NotFound();
        }
        return Ok(category);
    }
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateCategoryDto dto)
    {
        CategoryDto created =
            await _categoryService.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateCategoryDto dto)
    {
        bool updated =
            await _categoryService.UpdateAsync(
                id,
                dto);
        if (!updated)
        {
            return NotFound();
        }
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted =
            await _categoryService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}
