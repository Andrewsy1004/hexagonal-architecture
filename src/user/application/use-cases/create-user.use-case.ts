import { Inject, Injectable } from "@nestjs/common";

import * as ports from "../ports";
import { User } from "src/user/domain";
import { CreateUserDto } from "../dto";


@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(ports.USER_REPOSITORY)
    private readonly userRepository: ports.UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) throw new Error('User with this email already exists.');
    
    const user = User.create(dto.name, dto.email);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}