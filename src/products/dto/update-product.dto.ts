import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// PartialType() is a utility function provided by the @nestjs/mapped-types package.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
