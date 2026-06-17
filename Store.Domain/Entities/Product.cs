namespace Store.Domain.Entities;

public sealed class Product
{
    public int Id { get; set; }
    public required string Name { get; set; } 
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string? ImageURL { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}
