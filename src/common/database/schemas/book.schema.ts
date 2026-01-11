import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  authors: string;

  @Prop({ type: String, required: false })
  favorite: string;

  @Prop({ type: String, required: false })
  fileCover: string;

  @Prop({ type: String, required: false })
  fileName: string;

  @Prop({ type: String, required: false })
  fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
