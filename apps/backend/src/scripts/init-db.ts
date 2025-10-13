import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

async function initializeDatabase() {
  const app = await NestFactory.create(AppModule);
  const connection = app.get<Connection>(getConnectionToken());

  try {
    console.log('🔄 Initializing database...');

    // Check if connection and db exist
    if (!connection || !connection.db) {
      throw new Error('Database connection not established');
    }

    // Get all collections
    const collections = await connection.db.listCollections().toArray();
    console.log(
      '📋 Existing collections:',
      collections.map((c) => c.name),
    );

    // Create indexes
    console.log('🔄 Creating indexes...');
    await connection.syncIndexes();
    console.log('✅ Indexes created successfully');

    // List collections after sync
    const newCollections = await connection.db.listCollections().toArray();
    console.log(
      '📋 Collections after initialization:',
      newCollections.map((c) => c.name),
    );

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    await app.close();
  }
}

initializeDatabase().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
