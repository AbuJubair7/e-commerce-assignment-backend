import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from './module/products/entities/product.entity';
import { Category } from './module/categories/entities/category.entity';
import { User } from './module/users/entities/user.entity';
import { Cart } from './module/cart/entities/cart.entity';
import { CartItem } from './module/cart/entities/cart-item.entity';

dotenv.config();

const isSsl = process.env.DB_SSL === 'true';

export const AppDataSource = new DataSource(
  process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: isSsl ? { rejectUnauthorized: false } : false,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: false,
        entities: [Product, Category, User, Cart, CartItem],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        subscribers: [],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || process.env.DB_NAME || 'e-commerce',
        ssl: isSsl ? { rejectUnauthorized: false } : false,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: false,
        entities: [Product, Category, User, Cart, CartItem],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        subscribers: [],
      },
);
