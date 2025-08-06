import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateAutUseCase } from '../../application/use-cases/create-aut.use-case';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
export class AutController {
  constructor(private readonly createAutUseCase: CreateAutUseCase) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.createAutUseCase.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.createAutUseCase.login(loginUserDto);
  }
}
