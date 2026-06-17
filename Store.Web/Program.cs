using Microsoft.EntityFrameworkCore;
using Store.Infrastructure;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("Database"));
});

WebApplication app = builder.Build();

app.Run();