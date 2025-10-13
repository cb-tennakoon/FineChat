import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ enum: ['private', 'group'], required: true })
  type: string;

  @Prop()
  name?: string; // Only for group chats

  @Prop()
  description?: string; // Only for group chats

  @Prop()
  avatar?: string; // Only for group chats

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin?: Types.ObjectId; // Only for group chats

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  admins?: Types.ObjectId[]; // Multiple admins for group chats

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastMessage?: Types.ObjectId;

  @Prop({ default: Date.now })
  lastMessageAt: Date;

  @Prop({ default: false })
  isArchived: boolean;

  @Prop({ default: false })
  isPinned: boolean;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

// Index for faster queries
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ lastMessageAt: -1 });
