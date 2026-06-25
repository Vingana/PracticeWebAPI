using FluentValidation;
using Store.Services.Models.Product;
namespace Store.Services.Validators;
public sealed class CreateProductDtoValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MaximumLength(200).WithMessage("Product name must not exceed 200 characters.");
        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters.")
            .When(x => x.Description is not null);
        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");
        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0).WithMessage("Quantity must be 0 or more.");
        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("A valid category must be selected.");
        RuleFor(x => x.ImageURL)
            .MaximumLength(500).WithMessage("Image URL must not exceed 500 characters.")
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage("Image URL must be a valid absolute URL.")
            .When(x => !string.IsNullOrWhiteSpace(x.ImageURL));
    }
}
public sealed class UpdateProductDtoValidator : AbstractValidator<UpdateProductDto>
{
    public UpdateProductDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MaximumLength(200).WithMessage("Product name must not exceed 200 characters.");
        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters.")
            .When(x => x.Description is not null);
        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");
        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0).WithMessage("Quantity must be 0 or more.");
        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("A valid category must be selected.");
        RuleFor(x => x.ImageURL)
            .MaximumLength(500).WithMessage("Image URL must not exceed 500 characters.")
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage("Image URL must be a valid absolute URL.")
            .When(x => !string.IsNullOrWhiteSpace(x.ImageURL));
    }
}
