import { User } from "src/user/domain";

export interface UserRepositoryPort {
  save(user: User): Promise<User> | User;
  findById(id: string): Promise<User | null> | User | null;
  findByEmail(email: string): Promise<User | null> | User | null;
  findAll(): Promise<User[]> | User[];
  delete(id: string): Promise<{ message: string }>; 
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');