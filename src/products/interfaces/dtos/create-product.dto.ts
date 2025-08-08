import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The title product',
    minimum: 1,
  })
  title: string;

  @IsString()
  @ApiProperty()
  description: string;
}
