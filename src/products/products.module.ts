import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
