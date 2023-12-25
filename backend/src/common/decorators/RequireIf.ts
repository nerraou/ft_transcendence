import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function RequireIf(
  predicate: (object: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    if (typeof validationOptions?.message != "string") {
      validationOptions = {
        ...(validationOptions || {}),
        message: `${propertyName} required`,
      };
    }

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [predicate],
      validator: RequireIfConstraint,
    });
  };
}

@ValidatorConstraint({ name: "RequireIf" })
export class RequireIfConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const [predicate] = args.constraints;

    return !predicate(args.object);
  }
}
