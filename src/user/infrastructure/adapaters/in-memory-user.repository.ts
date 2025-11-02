import { Injectable } from "@nestjs/common";

import { UserRepositoryPort } from "src/user/application";
import { User } from "src/user/domain";


@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();
  
  
  save(user: User) {
    this.users.set(user.getId().getValue(), user);
    return user;
  }

  findById(id: string) {
    return this.users.get(id) || null;
  }

  findByEmail(email: string) {
    const users = Array.from(this.users.values());
    return users.find((user) => user.getEmail().getValue() === email) || null;
  }

  findAll() {
    return Array.from(this.users.values());
  }

  delete(id: string): Promise<{ message: string; }> {
    // In case that the user does not exist
    if (!this.users.has(id)) return Promise.resolve({ message: 'User not found' });
    
    this.users.delete(id);
    return Promise.resolve({ message: 'User deleted successfully' });
  }

  
}