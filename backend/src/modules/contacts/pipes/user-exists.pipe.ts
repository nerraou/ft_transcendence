import { ForbiddenException, Injectable, PipeTransform } from "@nestjs/common";

import { UsersService } from "@modules/users/users.service";

import { CreateContactDto } from "../dto/create-contact.dto";

@Injectable()
export default class UserExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: CreateContactDto) {
    const user = await this.usersService.findOneById(value.userId);

    if (!user) {
      throw new ForbiddenException();
    }

    return value;
  }
}
