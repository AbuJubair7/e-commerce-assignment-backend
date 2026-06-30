# E-Commerce Backend API

This is the backend REST API for the E-Commerce Full Stack Assignment, built using **NestJS**, **TypeScript**, **PostgreSQL**, and **TypeORM**.

## 🏗 Architecture Explanation

The application follows a strictly modular, domain-driven architecture using NestJS:

- **`AuthModule` & `UsersModule`**: Handles JWT-based authentication using Passport.js and `bcrypt` for password hashing.
- **`ProductsModule`**: Manages product data with server-side pagination, search, and category filtering executed directly at the database level via TypeORM QueryBuilder.
- **`CategoriesModule`**: Provides dynamic category routing.
- **`CartModule`**: Handles all cart interactions (adding items, updating quantities, removing items) on the server side to ensure persistence across page navigation.

**Global Configurations:**

- **Validation**: `class-validator` and `class-transformer` are used within a global `ValidationPipe` to strictly enforce DTO structures and strip malicious payloads.
- **Error Handling**: A global `ExceptionFilter` catches all HTTP exceptions and standardizes the error response envelope.
- **Documentation**: Swagger OpenAPI is integrated for automatic API documentation and testing.

## ⚙️ Environment Variables

Create a `.env` file in the root of this backend directory with the following variables:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=pass
DB_NAME=e-commerce
DB_SYNCHRONIZE=true
JWT_SECRET=super-secret-key-change-in-production
```

## 🚀 Setup Instructions

### 1. Database Setup (Docker)

This project includes a `docker-compose.yml` file to instantly spin up a local PostgreSQL database and containerize the API.

```bash
# Start the PostgreSQL database (and the API) in the background
docker-compose up -d
```

_(Note: The database is mapped to port 5433 on your local machine to avoid conflicts with native Postgres installations)._

### 2. Install Dependencies

If you wish to run the app locally (outside of Docker):

```bash
npm install
```

### 3. Database Migrations & Seeding

As per the assignment requirements, the database must be seeded with 50+ products from DummyJSON. We built a custom TypeORM migration script that fetches this data over the internet and directly maps it into the PostgreSQL schema.

```bash
# Run the TypeORM Seeder script
npm run seed
```

### 4. Running the App (Local Dev)

```bash
npm run start:dev
```

### 5. View API Documentation

Once the server is running, navigate to the Swagger UI to test the endpoints:
**http://localhost:5001/api/docs**

## 🛑 Assumptions & Limitations

- **State Management**: As aligned with the project goals, Cart persistence is handled strictly on the backend rather than local storage to ensure data persists reliably across all devices.
- **Mock Data Limits**: The initial database seeder fetches exactly 50 items from DummyJSON as a one-time import. No further external requests are made to DummyJSON during runtime.
- **Security**: `DB_SYNCHRONIZE=true` is used for rapid development. In a real-world production environment, this would be disabled in favor of strict, incremental TypeORM migrations.
