import { IsString, IsNumber } from 'class-validator';

// DTO for creating a product
export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;
}
