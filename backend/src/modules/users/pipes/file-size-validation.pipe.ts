import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const oneMega = 1048576;

    if (value.size > oneMega) {
      throw new UnprocessableEntityException();
    }

    return value;
  }
}
