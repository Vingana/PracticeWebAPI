using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;

namespace Store.Infrastructure.Seed;

public static class ProductSeed
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "MacBook Air M3",
                Description = "Lightweight Apple laptop with M3 chip",
                Quantity = 10,
                Price = 999.99m,
                ImageURL = null,
                CategoryId = 1
            },
            new Product
            {
                Id = 2,
                Name = "Dell XPS 15",
                Description = "Premium Windows laptop",
                Quantity = 5,
                Price = 1499.99m,
                ImageURL = null,
                CategoryId = 1
            },
            new Product
            {
                Id = 3,
                Name = "Lenovo ThinkPad X1",
                Description = "Business ultrabook",
                Quantity = 7,
                Price = 1299.99m,
                ImageURL = null,
                CategoryId = 1
            },

            new Product
            {
                Id = 4,
                Name = "iPhone 16",
                Description = "Apple flagship smartphone",
                Quantity = 15,
                Price = 1099.99m,
                ImageURL = null,
                CategoryId = 2
            },
            new Product
            {
                Id = 5,
                Name = "Samsung Galaxy S25",
                Description = "Samsung flagship smartphone",
                Quantity = 12,
                Price = 999.99m,
                ImageURL = null,
                CategoryId = 2
            },
            new Product
            {
                Id = 6,
                Name = "Google Pixel 10",
                Description = "Android smartphone by Google",
                Quantity = 8,
                Price = 899.99m,
                ImageURL = null,
                CategoryId = 2
            },

            new Product
            {
                Id = 7,
                Name = "Wireless Mouse",
                Description = "Bluetooth wireless mouse",
                Quantity = 30,
                Price = 29.99m,
                ImageURL = null,
                CategoryId = 3
            },
            new Product
            {
                Id = 8,
                Name = "Mechanical Keyboard",
                Description = "RGB mechanical keyboard",
                Quantity = 20,
                Price = 79.99m,
                ImageURL = null,
                CategoryId = 3
            },
            new Product
            {
                Id = 9,
                Name = "USB-C Hub",
                Description = "Multiport USB-C adapter",
                Quantity = 25,
                Price = 49.99m,
                ImageURL = null,
                CategoryId = 3
            },
            new Product
            {
                Id = 10,
                Name = "Laptop Stand",
                Description = "Adjustable aluminum laptop stand",
                Quantity = 18,
                Price = 39.99m,
                ImageURL = null,
                CategoryId = 3
            }
        );
    }
}