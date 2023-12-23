import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function Require(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    if (typeof validationOptions?.message != "string") {
      validationOptions = {
        ...(validationOptions || {}),
        message: `${propertyName} require the presense of ${property}`,
      };
    }

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: RequireConstraint,
    });
  };
}

@ValidatorConstraint({ name: "Require" })
export class RequireConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    const relatedValue = args.object[relatedPropertyName];

    return typeof relatedValue != "undefined";
  }
}
