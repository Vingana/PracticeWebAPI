using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;

namespace Store.Infrastructure.Seed;

public static class CategorySeed
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = 1,
                Name = "Laptops"
            },
            new Category
            {
                Id = 2,
                Name = "Smartphones"
            },
            new Category
            {
                Id = 3,
                Name = "Accessories"
            }
        );
    }
}