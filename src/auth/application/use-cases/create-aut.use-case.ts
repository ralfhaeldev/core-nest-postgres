import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';

@Injectable()
export class CreateAutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.authRepository.create(createUserDto);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    return this.authRepository.login(loginUserDto);
  }
}
