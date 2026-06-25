namespace Store.Services.Models.Product;
public sealed class CreateProductDto
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string? ImageURL { get; set; }
    public int CategoryId { get; set; }
}
