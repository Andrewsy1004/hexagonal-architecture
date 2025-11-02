import { Injectable } from "@nestjs/common";

import { User } from "src/user/domain";
import { UserResponseDto } from "../dto";


@Injectable()
export class UserResponseMapper {
  toDto(user: User): UserResponseDto {
    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpatedAt(),
      accountAge: user.getAccountAge(),
    };
  }

  toDtoList(users: User[]): UserResponseDto[] {
    return users.map(user => this.toDto(user));
  }
}