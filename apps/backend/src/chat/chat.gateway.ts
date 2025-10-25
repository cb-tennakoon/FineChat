import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';

// Define the plain message object type for emitting to clients
interface PlainMessage {
  _id: string;
  username: string;
  content: string;
  time: string;
  createdAt: Date;
}

@WebSocketGateway({
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() { username }: { username: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('joined', { message: `Welcome ${username}!` });

    // Use lean() for plain objects
    const history = await this.messageModel
      .find()
      .sort({ createdAt: 1 })
      .lean()
      .exec();

    client.emit('history', history);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() { username, content }: { username: string; content: string },
  ) {
    // Save message to database
    const savedMessage = await this.messageModel.create({
      username,
      content,
      // time auto-filled by schema
    });

    // Convert to plain object and cast to PlainMessage type
    const plainMessage: PlainMessage = {
      _id: (savedMessage._id as any).toString(),
      username: savedMessage.username,
      content: savedMessage.content,
      time: savedMessage.time,
      createdAt: (savedMessage as any).createdAt || new Date(),
    };

    this.server.emit('message', plainMessage);
  }
}