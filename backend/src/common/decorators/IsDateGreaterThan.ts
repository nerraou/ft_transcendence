import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function IsDateGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    if (typeof validationOptions?.message != "string") {
      validationOptions = {
        ...(validationOptions || {}),
        message: `${propertyName} must be greater than ${property}`,
      };
    }

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsDateGreaterThanConstraint,
    });
  };
}

@ValidatorConstraint({ name: "IsDateGreaterThan" })
export class IsDateGreaterThanConstraint
  implements ValidatorConstraintInterface
{
  validate(value: Date, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    const relatedValue = args.object[relatedPropertyName];

    return (
      typeof value === "object" &&
      typeof relatedValue === "object" &&
      value > relatedValue
    );
  }
}
