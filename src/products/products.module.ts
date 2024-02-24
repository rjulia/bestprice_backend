import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Event } from '../events/entities/event.entity';

// The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Event])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
