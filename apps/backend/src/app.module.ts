import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { arcjetModuleConfig } from './config/arcjet.config';
// Import all schemas
import { User, UserSchema } from './schemas/user.schema';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  FriendRequest,
  FriendRequestSchema,
} from './schemas/friend-request.schema';
import {
  NotificationSchema,
  Notification,
} from './schemas/notification.schema';
import { Typing, TypingSchema } from './schemas/typing.schema';
import { ArcjetModule } from '@arcjet/nest';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ChatModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp',
    ),
    // Register all schemas globally
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
      { name: FriendRequest.name, schema: FriendRequestSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Typing.name, schema: TypingSchema },
    ]),

    AuthModule,
    UsersModule,
    ArcjetModule.forRoot(arcjetModuleConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
