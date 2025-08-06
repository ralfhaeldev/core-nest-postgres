import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { JwtPayload } from '../interfaces/dtos/jwt-payload.interace';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposity: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || '',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userReposity.findOneBy({ id });
    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user?.isActive) throw new UnauthorizedException('User is inactive');

    return user;
  }
}
