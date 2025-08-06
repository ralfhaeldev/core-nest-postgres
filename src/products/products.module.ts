import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { CrudProductUseCase } from './application/use-cases/crud-product.use-case';
import { TypeormProductRepository } from './infrastructure/repositories/typeorm-product.repository';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule],
  controllers: [ProductController],
  providers: [
    CrudProductUseCase,
    TypeormProductRepository,
    {
      provide: 'ProductRepository',
      useExisting: TypeormProductRepository,
    },
  ],
})
export class ProductsModule {}
