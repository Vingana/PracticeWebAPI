using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Store.Services.Exceptions;
namespace Store.Web.Filters;
public sealed class BusinessValidationExceptionHandler : IExceptionHandler
{
    private readonly ILogger<BusinessValidationExceptionHandler> _logger;
    public BusinessValidationExceptionHandler(ILogger<BusinessValidationExceptionHandler> logger)
    {
        _logger = logger;
    }
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not BusinessValidationException businessEx)
        {
            return false;
        }
        _logger.LogWarning(businessEx, "Business validation failed: {Message}", businessEx.Message);
        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        httpContext.Response.ContentType = "application/json";
        var propertyName = string.IsNullOrWhiteSpace(businessEx.PropertyName) 
            ? "General" 
            : businessEx.PropertyName;
        var problemDetails = new ValidationProblemDetails(new Dictionary<string, string[]>
        {
            { propertyName, new[] { businessEx.Message } }
        })
        {
            Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
            Title = "One or more validation errors occurred.",
            Status = StatusCodes.Status400BadRequest,
            Detail = businessEx.Message,
            Instance = httpContext.Request.Path
        };
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
