import { Module } from '@nestjs/common';
import { AutController } from './interfaces/controllers/aut.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { CreateAutUseCase } from './application/use-cases/create-aut.use-case';
import { TypeormAuthRepository } from './infrastructure/repositories/typeorm-auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  controllers: [AutController],
  providers: [
    JwtStrategy,
    CreateAutUseCase,
    TypeormAuthRepository,
    {
      provide: 'AuthRepository',
      useExisting: TypeormAuthRepository,
    },
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
