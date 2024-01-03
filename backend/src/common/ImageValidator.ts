import {
  FileValidator,
  ParseFilePipeBuilder,
  PayloadTooLargeException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from "@nestjs/common";
import { ONE_MEGA } from "./constants";

function isPng(buffer: Buffer) {
  if (!buffer || buffer.length < 8) {
    return false;
  }

  return (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  );
}

function isJpg(buffer: Buffer) {
  if (!buffer || buffer.length < 3) {
    return false;
  }

  return buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255;
}

export class ImageValidator extends FileValidator {
  constructor() {
    super({});
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    if (file) {
      return isPng(file.buffer) || isJpg(file.buffer);
    }

    return false;
  }

  buildErrorMessage(): string {
    return "type";
  }
}

interface BuildParseFilePipeOptions {
  required: boolean;
}

export function buildParseFilePipe(options: BuildParseFilePipeOptions) {
  return new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: ONE_MEGA,
      message: "size",
    })
    .addValidator(new ImageValidator())
    .build({
      fileIsRequired: options.required,
      exceptionFactory(error) {
        if (error == "size") {
          return new PayloadTooLargeException();
        } else if (error == "type") {
          return new UnsupportedMediaTypeException();
        } else if (error == "File is required") {
          return new UnprocessableEntityException({
            error: "Unprocessable Entity",
            message: ["file is required"],
            statusCode: 422,
          });
        }
      },
    });
}
