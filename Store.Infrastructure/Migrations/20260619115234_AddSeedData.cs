using Microsoft.EntityFrameworkCore.Migrations;
#nullable disable
#pragma warning disable CA1814 
namespace Store.Infrastructure.Migrations
{
    public partial class AddSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "Orders");
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 100,
                oldNullable: true);
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Laptops" },
                    { 2, "Smartphones" },
                    { 3, "Accessories" }
                });
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "Description", "ImageURL", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, "Lightweight Apple laptop with M3 chip", null, "MacBook Air M3", 999.99m, 10 },
                    { 2, 1, "Premium Windows laptop", null, "Dell XPS 15", 1499.99m, 5 },
                    { 3, 1, "Business ultrabook", null, "Lenovo ThinkPad X1", 1299.99m, 7 },
                    { 4, 2, "Apple flagship smartphone", null, "iPhone 16", 1099.99m, 15 },
                    { 5, 2, "Samsung flagship smartphone", null, "Samsung Galaxy S25", 999.99m, 12 },
                    { 6, 2, "Android smartphone by Google", null, "Google Pixel 10", 899.99m, 8 },
                    { 7, 3, "Bluetooth wireless mouse", null, "Wireless Mouse", 29.99m, 30 },
                    { 8, 3, "RGB mechanical keyboard", null, "Mechanical Keyboard", 79.99m, 20 },
                    { 9, 3, "Multiport USB-C adapter", null, "USB-C Hub", 49.99m, 25 },
                    { 10, 3, "Adjustable aluminum laptop stand", null, "Laptop Stand", 39.99m, 18 }
                });
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "TEXT",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 100);
            migrationBuilder.AddColumn<string>(
                name: "OrderNumber",
                table: "Orders",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
