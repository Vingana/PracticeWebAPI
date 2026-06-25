using FluentValidation;
using Store.Services.Models.Order;
namespace Store.Services.Validators;
public sealed class CreateOrderDtoValidator : AbstractValidator<CreateOrderDto>
{
    public CreateOrderDtoValidator()
    {
        RuleFor(x => x.CustomerName)
            .NotEmpty().WithMessage("Full name is required.")
            .MaximumLength(200).WithMessage("Full name must not exceed 200 characters.");
        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone number is required.")
            .MaximumLength(20).WithMessage("Phone number must not exceed 20 characters.")
            .Matches(@"^[\d\s\+\-\(\)]+$")
            .WithMessage("Phone number contains invalid characters.");
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("A valid email address is required.")
            .MaximumLength(254).WithMessage("Email address must not exceed 254 characters.");
        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Delivery address is required.")
            .MaximumLength(500).WithMessage("Address must not exceed 500 characters.");
        RuleFor(x => x.Items)
            .NotEmpty().WithMessage("Order must contain at least one item.");
        RuleForEach(x => x.Items).SetValidator(new OrderItemDtoValidator());
    }
}
public sealed class OrderItemDtoValidator : AbstractValidator<OrderItemDto>
{
    public OrderItemDtoValidator()
    {
        RuleFor(x => x.ProductId)
            .GreaterThan(0).WithMessage("A valid product must be specified.");
        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Item quantity must be at least 1.");
        RuleFor(x => x.UnitPrice)
            .GreaterThan(0).WithMessage("Item unit price must be greater than 0.");
    }
}
public sealed class UpdateOrderStatusDtoValidator : AbstractValidator<UpdateOrderStatusDto>
{
    public UpdateOrderStatusDtoValidator()
    {
        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("Invalid order status value.");
    }
}
