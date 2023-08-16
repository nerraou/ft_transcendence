import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
