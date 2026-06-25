using FluentValidation;
using Store.Services.Models.Cart;
namespace Store.Services.Validators;
public sealed class AddCartItemDtoValidator : AbstractValidator<AddCartItemDto>
{
    public AddCartItemDtoValidator()
    {
        RuleFor(x => x.ProductId)
            .GreaterThan(0).WithMessage("A valid product must be specified.");
        RuleFor(x => x.ProductName)
            .NotEmpty().WithMessage("Product name is required.")
            .MaximumLength(200).WithMessage("Product name must not exceed 200 characters.");
        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");
        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Quantity must be at least 1.");
    }
}
