import 'dotenv/config'; // Loads variables from .env into process.env
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './module/categories/categories.module';
import { ProductsModule } from './module/products/products.module';
import { UsersModule } from './module/users/users.module';
import { CartModule } from './module/cart/cart.module';
import { AuthModule } from './module/auth/auth.module';

const isSsl = process.env.DB_SSL === 'true';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            ssl: isSsl ? { rejectUnauthorized: false } : false,
            autoLoadEntities: true, // Automatically loads entities registered in features
            synchronize: process.env.DB_SYNCHRONIZE === 'true', // Warning: Don't use true in production, use migrations instead
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || process.env.DB_NAME || 'e-commerce',
            ssl: isSsl ? { rejectUnauthorized: false } : false,
            autoLoadEntities: true,
            synchronize: process.env.DB_SYNCHRONIZE === 'true',
          }
    ),
    CategoriesModule,
    ProductsModule,
    UsersModule,
    CartModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
