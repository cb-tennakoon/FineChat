import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  exports: [MongooseModule],
  providers: [ChatGateway],
})
export class ChatModule {}
