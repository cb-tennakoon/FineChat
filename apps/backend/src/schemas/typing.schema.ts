import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TypingDocument = Typing & Document;

@Schema({ timestamps: true })
export class Typing {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: Types.ObjectId;

  @Prop({ default: Date.now, expires: 10 }) // Auto-delete after 10 seconds
  timestamp: Date;
}

export const TypingSchema = SchemaFactory.createForClass(Typing);

TypingSchema.index({ conversationId: 1, userId: 1 });
