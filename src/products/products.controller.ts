import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * This method returns all products
   * @param paginationQuery
   * @returns Product[]
   * @example
   * http://localhost:3000/products?limit=10&offset=0
   **/

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    // const { limit, offset } = paginationQuery;
    return await this.productsService.findAll(paginationQuery);
  }

  /**
   * This method returns a single product
   * @param id
   * @returns Product
   * @example
   * http://localhost:3000/products/1
   **/

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  /**
   * This method creates a new product
   * @param createProductDto
   * @returns string
   **/

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto): string {
    this.productsService.create(createProductDto);
    return 'This action adds a new product';
  }

  /**
   * This method updates a product
   * @param id
   * @param updateProductDto
   * @returns Product
   **/

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  /**
   * This method removes a product
   * @param id
   * @returns string
   **/

  @Delete(':id')
  remove(@Param('id') id: string): string {
    this.productsService.remove(+id);
    return `This will remove product with id ${id}`;
  }
}
