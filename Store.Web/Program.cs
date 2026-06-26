using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Store.Infrastructure;
using Store.Services.Validators;
using Store.Web.Filters;
using Store.Web.CartService;
using Store.Services.CategoryService;
using Store.Services.OrderService;
using Store.Services.ProductService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".Store.Session";
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});
builder.Services.AddDistributedMemoryCache();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductDtoValidator>();
builder.Services.AddOpenApi();
builder.Services.AddExceptionHandler<BusinessValidationExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy("React",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:50129")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("Database"));
});

var app = builder.Build();

app.MapGet("/", () =>
{
    return Results.Redirect("/scalar/");
});

app.MapOpenApi();
app.MapScalarApiReference();

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("React");
app.UseSession();
app.MapControllers();
app.Run();
