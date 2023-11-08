import { ConflictException, Injectable, PipeTransform } from "@nestjs/common";

import { UsersService } from "@modules/users/users.service";

import { UpdateProfileDto } from "../dto/update-profile.dto";

@Injectable()
export default class UsernameExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: UpdateProfileDto) {
    if (!value.username) {
      return value;
    }

    const user = await this.usersService.findOneByUsername(value.username);

    if (user) {
      throw new ConflictException();
    }

    return value;
  }
}
