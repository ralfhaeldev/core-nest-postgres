import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginResponse } from 'src/auth/interfaces/dtos/login-response.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/dtos/jwt-payload.interace';
import { JwtService } from '@nestjs/jwt';
import { instanceToInstance } from 'class-transformer';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';

@Injectable()
export class TypeormAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        pawssowrd: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      const userWithoutPassword = instanceToInstance(user); // respeta @Exclude()

      const response: LoginResponse = {
        user: userWithoutPassword,
        token: this.getJwt({ id: user.id }),
      };

      return response;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        fullName: true,
        roles: true,
        pawssowrd: true,
        id: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('credentials are not valid(email)');
    if (!bcrypt.compareSync(password, user.pawssowrd))
      throw new UnauthorizedException('credentials are not valid (password)');

    const userWithoutPassword = instanceToInstance(user); // respeta @Exclude()

    const response: LoginResponse = {
      user: userWithoutPassword,
      token: this.getJwt({ id: user.id }),
    };

    return response;
  }
}
