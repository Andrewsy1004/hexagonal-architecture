import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import * as ports from "../ports";
import { UpdateUserDto } from "../dto";


@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(ports.USER_REPOSITORY)
    private readonly userRepository: ports.UserRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');
    
    if (dto.name)  user.updateName(dto.name);
    if (dto.email) user.updateEmail(dto.email);

    return this.userRepository.save(user);
  }
}