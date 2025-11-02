import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  HttpCode, 
  HttpStatus, 
  Delete,
  Param,
  Patch
} from "@nestjs/common";

import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody 
} from '@nestjs/swagger';

import * as application from "../application";
import { User } from "../domain";
import { CreateUserDto, UpdateUserDto } from "../application/dto";


class UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  accountAge: number;
}

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: application.CreateUserUseCase,
    private readonly listUsersUseCase: application.ListUsersUseCase,
    private readonly DeleteUserUseCase: application.DeleteUserUseCase,
    private readonly updateUserUseCase: application.UpdateUserUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Creates a new user with the provided name and email'
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'User data to create',
    examples: {
      example1: {
        summary: 'Example user',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully',
    type: UserResponseDto,
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      accountAge: 0
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - User already exists' 
  })
  async createUser(@Body() request: CreateUserDto) {
    const user = await this.createUserUseCase.execute(request);
    return this.mapUserToResponse(user);
  }
  
  @Get()
  @ApiOperation({ 
    summary: 'List all users',
    description: 'Returns a list of all registered users in the system'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of users retrieved successfully',
    type: [UserResponseDto],
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        accountAge: 30
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z',
        accountAge: 15
      }
    ]
  })
  async listUsers() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => this.mapUserToResponse(user));
  }
  
  
  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'User deleted successfully', schema: { example: { message: 'User deleted successfully' } } })
  @ApiResponse({ status: 404, description: 'User not found', schema: { example: { message: 'User not found' } } })
  async deleteUser(@Param('id') id: string) {
    return this.DeleteUserUseCase.execute(id);
  }


  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a user',
    description: 'Updates the user with the specified ID'
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, body);
    return this.mapUserToResponse(user);
  }

  
  private mapUserToResponse(user: User): UserResponseDto {
    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpatedAt(),
      accountAge: user.getAccountAge(),
    };
  }
}