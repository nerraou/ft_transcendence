import {
  PipeTransform,
  Injectable,
  PayloadTooLargeException,
  UnprocessableEntityException,
  HttpStatus,
} from "@nestjs/common";

export const ONE_MEGA = 1024 * 1024;
export const TWO_MEGA = ONE_MEGA * 2;

interface FileSizeValidationPipeOptions {
  maxSize: number;
  isOptional: boolean;
}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private options?: FileSizeValidationPipeOptions) {
    this.options = options || {
      isOptional: false,
      maxSize: ONE_MEGA,
    };
  }

  transform(value: Express.Multer.File) {
    if (!value && this.options.isOptional) {
      return value;
    }

    if (!value) {
      throw new UnprocessableEntityException({
        message: ["image is a required field"],
        error: "Unprocessable Entity",
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    if (value.size > this.options.maxSize) {
      throw new PayloadTooLargeException();
    }

    return value;
  }
}
