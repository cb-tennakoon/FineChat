import {
  WebSocketGateway, // ← Opens WebSocket door
  WebSocketServer, // ← Gets ALL users list
  SubscribeMessage, // ← Listens for messages
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection, // ← Gets message content
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // ← Socket.IO server
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: 'http://localhost:3000', credentials: true }, // ← CORS FIXED!
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);
  server: any;

  // PART 1: Handle Connection/Disconnect
  handleConnection(client: Socket) {
    this.logger.log(`✅ Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Client disconnected: ${client.id}`);
  }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string) {
  //   console.log('📨 BACKEND RECEIVED:', message); // ← DEBUG
  //   this.server.emit('message', message);
  // }
}
