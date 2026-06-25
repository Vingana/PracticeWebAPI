using Microsoft.AspNetCore.Mvc;
using Store.Services.Models.Product;
using Store.Services.ProductService;
namespace Store.Web.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] int? categoryId)
    {
        IEnumerable<ProductDto> products =
            await _productService.GetAllAsync();
        if (!string.IsNullOrWhiteSpace(search))
        {
            products = products.Where(product =>
                product.Name.Contains(
                    search,
                    StringComparison.OrdinalIgnoreCase));
        }
        if (categoryId.HasValue)
        {
            products = products.Where(product =>
                product.CategoryId == categoryId.Value);
        }
        return Ok(products);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        ProductDto? product =
            await _productService.GetByIdAsync(id);
        if (product is null)
        {
            return NotFound();
        }
        return Ok(product);
    }
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateProductDto dto)
    {
        ProductDto created =
            await _productService.CreateAsync(dto);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateProductDto dto)
    {
        bool updated =
            await _productService.UpdateAsync(id, dto);
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
            await _productService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}
