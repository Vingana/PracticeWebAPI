using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Store.Infrastructure;
#nullable disable
namespace Store.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20260619115234_AddSeedData")]
    partial class AddSeedData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "10.0.9");
            modelBuilder.Entity("Store.Domain.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");
                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");
                    b.HasKey("Id");
                    b.ToTable("Categories");
                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Laptops"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Smartphones"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Accessories"
                        });
                });
            modelBuilder.Entity("Store.Domain.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");
                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("TEXT");
                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");
                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");
                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");
                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("TEXT");
                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");
                    b.HasKey("Id");
                    b.ToTable("Orders");
                });
            modelBuilder.Entity("Store.Domain.Entities.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");
                    b.Property<int>("OrderId")
                        .HasColumnType("INTEGER");
                    b.Property<int>("ProductId")
                        .HasColumnType("INTEGER");
                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");
                    b.Property<decimal>("UnitPrice")
                        .HasPrecision(18, 2)
                        .HasColumnType("TEXT");
                    b.HasKey("Id");
                    b.HasIndex("OrderId");
                    b.HasIndex("ProductId");
                    b.ToTable("OrderItems");
                });
            modelBuilder.Entity("Store.Domain.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");
                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");
                    b.Property<string>("Description")
                        .HasMaxLength(2000)
                        .HasColumnType("TEXT");
                    b.Property<string>("ImageURL")
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");
                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");
                    b.Property<decimal>("Price")
                        .HasPrecision(18, 2)
                        .HasColumnType("TEXT");
                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");
                    b.HasKey("Id");
                    b.HasIndex("CategoryId");
                    b.ToTable("Products");
                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 1,
                            Description = "Lightweight Apple laptop with M3 chip",
                            Name = "MacBook Air M3",
                            Price = 999.99m,
                            Quantity = 10
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 1,
                            Description = "Premium Windows laptop",
                            Name = "Dell XPS 15",
                            Price = 1499.99m,
                            Quantity = 5
                        },
                        new
                        {
                            Id = 3,
                            CategoryId = 1,
                            Description = "Business ultrabook",
                            Name = "Lenovo ThinkPad X1",
                            Price = 1299.99m,
                            Quantity = 7
                        },
                        new
                        {
                            Id = 4,
                            CategoryId = 2,
                            Description = "Apple flagship smartphone",
                            Name = "iPhone 16",
                            Price = 1099.99m,
                            Quantity = 15
                        },
                        new
                        {
                            Id = 5,
                            CategoryId = 2,
                            Description = "Samsung flagship smartphone",
                            Name = "Samsung Galaxy S25",
                            Price = 999.99m,
                            Quantity = 12
                        },
                        new
                        {
                            Id = 6,
                            CategoryId = 2,
                            Description = "Android smartphone by Google",
                            Name = "Google Pixel 10",
                            Price = 899.99m,
                            Quantity = 8
                        },
                        new
                        {
                            Id = 7,
                            CategoryId = 3,
                            Description = "Bluetooth wireless mouse",
                            Name = "Wireless Mouse",
                            Price = 29.99m,
                            Quantity = 30
                        },
                        new
                        {
                            Id = 8,
                            CategoryId = 3,
                            Description = "RGB mechanical keyboard",
                            Name = "Mechanical Keyboard",
                            Price = 79.99m,
                            Quantity = 20
                        },
                        new
                        {
                            Id = 9,
                            CategoryId = 3,
                            Description = "Multiport USB-C adapter",
                            Name = "USB-C Hub",
                            Price = 49.99m,
                            Quantity = 25
                        },
                        new
                        {
                            Id = 10,
                            CategoryId = 3,
                            Description = "Adjustable aluminum laptop stand",
                            Name = "Laptop Stand",
                            Price = 39.99m,
                            Quantity = 18
                        });
                });
            modelBuilder.Entity("Store.Domain.Entities.OrderItem", b =>
                {
                    b.HasOne("Store.Domain.Entities.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                    b.HasOne("Store.Domain.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                    b.Navigation("Order");
                    b.Navigation("Product");
                });
            modelBuilder.Entity("Store.Domain.Entities.Product", b =>
                {
                    b.HasOne("Store.Domain.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                    b.Navigation("Category");
                });
            modelBuilder.Entity("Store.Domain.Entities.Category", b =>
                {
                    b.Navigation("Products");
                });
            modelBuilder.Entity("Store.Domain.Entities.Order", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
