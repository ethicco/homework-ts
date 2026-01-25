import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookCommentDocument = HydratedDocument<BookComment>;

@Schema()
export class BookComment {
  @Prop({ type: Types.ObjectId, ref: 'Book' })
  bookId: string;

  @Prop({ type: String, required: true })
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
