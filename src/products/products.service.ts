import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
    },
  ];

  /**
   *  This method creates a new product
   * @param product
   */

  create(product: any) {
    this.products.push(product);
  }

  /**
   *  This method returns all products
   * @returns Product[]
   */
  findAll() {
    return this.products;
  }

  /**
   * This method returns a single product
   * @param id
   * @returns Product
   */

  findOne(id: number) {
    const productExit = this.products.find((product) => product.id === id);

    if (!productExit) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    } else {
      return productExit;
    }
  }

  /**
   *  This method updates a product
   * @param id
   * @param product
   * @returns Product
   */

  update(id: number, product: UpdateProductDto) {
    const existingProduct = this.products.find((product) => product.id === id);
    if (existingProduct) {
      existingProduct.name = product.name;
      existingProduct.description = product.description;
      existingProduct.price = product.price;
    }

    return existingProduct;
  }

  /**
   *  This method removes a product
   * @param id
   */

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }
}
