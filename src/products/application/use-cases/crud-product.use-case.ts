import { CreateProductDto } from 'src/products/interfaces/dtos/create-product.dto';
import { ProductRepository } from 'src/products/domain/product-repository.interface';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../../interfaces/dtos/update-product.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@Injectable()
export class CrudProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository<ProductEntity>,
  ) {}

  async create(productDto: CreateProductDto) {
    const product = await this.productRepository.create(productDto);
    return product;
  }

  async update(id: string, updateproduct: UpdateProductDto) {
    const product = await this.productRepository.update(id, updateproduct);
    return product;
  }
  async findOne(term: string) {
    const product = await this.productRepository.findOne(term);
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const producs = await this.productRepository.findAll(paginationDto);
    return producs;
  }

  async delete(id: string) {
    return await this.productRepository.delete(id);
  }
}
