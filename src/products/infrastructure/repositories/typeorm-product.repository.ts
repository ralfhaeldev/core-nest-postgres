import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/product-repository.interface';
import { CreateProductDto } from 'src/products/interfaces/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/interfaces/dtos/update-product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormProductRepository
  implements ProductRepository<ProductEntity>
{
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return await this.productRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.save(createProductDto);
      return product;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(term: string): Promise<ProductEntity> {
    let product: ProductEntity | null = null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async findAll(paginationDto: PaginationDto): Promise<ProductEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });

    return products;
  }
}
