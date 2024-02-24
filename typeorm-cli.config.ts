import { ProductsRefactor1708704610707 } from 'src/migration/1708704610707-ProductsRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [ProductsRefactor1708704610707],
});
