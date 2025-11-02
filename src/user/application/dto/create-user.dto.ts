import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    minLength: 2,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    type: String,
    format: 'email',
    uniqueItems: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}