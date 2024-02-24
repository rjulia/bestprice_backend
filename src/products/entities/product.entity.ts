import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  comment: string;

  @Column('decimal')
  price: number;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @OneToMany(() => Brand, (brand) => brand.products, {
    cascade: true,
  })
  brands: Brand[];
}
