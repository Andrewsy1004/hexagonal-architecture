import { Module } from "@nestjs/common";

import { CreateUserUseCase, DeleteUserUseCase, ListUsersUseCase, UpdateUserUseCase, USER_REPOSITORY } from "./application";
import { InMemoryUserRepository } from "./infrastructure";
import { UserController, UserResponseMapper } from "./presentation";


@Module({
  controllers: [UserController],
  providers: [
   
    UserResponseMapper,

    CreateUserUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}