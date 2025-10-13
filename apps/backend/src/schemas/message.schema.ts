import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({
    enum: ['text', 'image', 'video', 'audio', 'file', 'system'],
    default: 'text',
  })
  type: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Object })
  attachment?: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  replyTo?: Types.ObjectId; // For reply functionality

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  readBy: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  deliveredTo: Types.ObjectId[];

  @Prop({ default: false })
  isEdited: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;

  @Prop({
    type: [
      {
        emoji: String,
        users: [{ type: Types.ObjectId, ref: 'User' }],
      },
    ],
    default: [],
  })
  reactions: Array<{
    emoji: string;
    users: Types.ObjectId[];
  }>;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Indexes for performance
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ sender: 1 });
