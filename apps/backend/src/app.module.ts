import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
