import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Brand } from './entities/brand.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    private readonly dataSources: DataSource,
  ) {}

  /**
   *  This method returns all products
   * @returns Product[]
   */
  findAll(paginationQuery: PaginationQueryDto) {
    return this.productRepository.find({
      relations: ['brands'],
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });
  }

  /**
   * This method returns a single product
   * @param id
   * @returns Product
   */

  async findOne(id: number) {
    const productExit = await this.productRepository.findOne({
      where: { id: +id },
      relations: ['brands'],
    });

    if (!productExit) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    } else {
      return productExit;
    }
  }

  /**
   *  This method creates a new product
   * @param createProductDto
   */

  async create(createProductDto: CreateProductDto) {
    const brands = await Promise.all(
      createProductDto.brands.map((brand) => this.preloadBrand(brand, null)),
    );
    const productEntity = this.productRepository.create({
      ...createProductDto,
      brands: brands,
    });
    return this.productRepository.save(productEntity);
  }

  /**
   *  This method updates a product
   * @param id
   * @param product
   * @returns Product
   */

  async update(id: string, updateProductDto: UpdateProductDto) {
    const brands =
      updateProductDto.brands &&
      (await Promise.all(
        updateProductDto.brands.map((brand) => this.preloadBrand(brand, id)),
      ));
    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
      brands,
    });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    } else {
      return this.productRepository.save(product);
    }
  }

  /**
   *  This method removes a product
   * @param id
   */

  async remove(id: number) {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }

  async recommendProduct(product: Product) {
    const queryRunner = this.dataSources.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      product.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_product';
      recommendEvent.type = 'product';
      recommendEvent.payload = { productId: product.id };

      await queryRunner.manager.save(recommendEvent);
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadBrand(brand: Brand, id: string | null): Promise<Brand> {
    let brandObj: Brand;
    if (id) {
      brandObj = await this.brandRepository.findOne({
        where: { name: brand.name, products: { id: +id } },
      });
      if (brandObj) {
        const updateBrand = await this.brandRepository.preload({
          id: +brandObj.id,
          ...brand,
        });
        return this.brandRepository.save(updateBrand);
      }
    }

    return this.brandRepository.create(brand);
  }
}
