namespace Store.Services.Models.Category;
public sealed class CategoryDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int ProductsCount { get; set; }
}
