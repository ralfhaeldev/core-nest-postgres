import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CrudProductUseCase } from 'src/products/application/use-cases/crud-product.use-case';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly crudProductUseCase: CrudProductUseCase) {}
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.crudProductUseCase.create(createProductDto);
  }

  @Get(':term')
  @UseGuards(AuthGuard())
  findOne(@Param('term') term: string) {
    return this.crudProductUseCase.findIne(term);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crudProductUseCase.findAll(paginationDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.crudProductUseCase.update(id, updateProductDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudProductUseCase.delete(id);
  }
}
