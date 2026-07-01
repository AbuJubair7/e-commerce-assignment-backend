import { AppDataSource } from './data-source';

async function run() {
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize();
    console.log('Running migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during migration run:', err);
    process.exit(1);
  }
}

run();
