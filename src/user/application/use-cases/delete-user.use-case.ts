import { Inject, Injectable } from "@nestjs/common";

import * as ports from "../ports";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(ports.USER_REPOSITORY)
    private readonly userRepository: ports.UserRepositoryPort,
  ) {}

  async execute(id: string) {
    return this.userRepository.delete(id);
  }
}