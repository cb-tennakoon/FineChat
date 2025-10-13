import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service'; // Fix: Capital 'U'

@Controller('users')
export class UsersController {
  // Fix: Inject service via constructor
  constructor(private readonly usersService: UsersService) {}

  // Public endpoint - Create user (same as register)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto, // Fix: new ValidationPipe()
  ) {
    const user = await this.usersService.create(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
    return {
      message: 'User created successfully',
      user,
    };
  }
}
