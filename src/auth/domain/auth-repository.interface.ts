import { CreateUserDto } from '../interfaces/dtos/create-user.dto';
import { LoginResponse } from '../interfaces/dtos/login-response.dto';
import { LoginUserDto } from '../interfaces/dtos/login-user.dto';

export abstract class AuthRepository {
  abstract create(createUserDto: CreateUserDto): Promise<LoginResponse>;
  abstract login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
}
