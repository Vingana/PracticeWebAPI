using System;
namespace Store.Services.Exceptions;
public class BusinessValidationException : Exception
{
    public string PropertyName { get; }
    public BusinessValidationException(string message, string propertyName = "") 
        : base(message)
    {
        PropertyName = propertyName;
    }
}
