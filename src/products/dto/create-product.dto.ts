import { IsString, IsNumber, IsObject, IsArray } from 'class-validator';
import { Brand } from '../entities/brand.entity';

// DTO for creating a product
export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly comment: string;

  @IsNumber()
  readonly price: number;

  @IsArray()
  readonly brands: Brand[];
}
