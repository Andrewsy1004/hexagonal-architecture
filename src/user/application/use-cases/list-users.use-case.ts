import { Inject, Injectable } from "@nestjs/common";

import * as ports from "../ports";


@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(ports.USER_REPOSITORY)
    private readonly userRepository: ports.UserRepositoryPort,
  ) {}

  async execute() {
    return this.userRepository.findAll();
  }
}