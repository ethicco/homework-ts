import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IBookComment,
  IBookCommentCreate,
  IBookCommentUpdate,
} from 'src/common/interfaces';
import { Injectable } from '@nestjs/common';
import { BookComment } from '../schemas/book-coment.schema';

@Injectable()
export class BookCommentsRepository {
  constructor(
    @InjectModel(BookComment.name)
    private readonly bookCommentModel: Model<BookComment>,
  ) {}

  create(bookComment: IBookCommentCreate): Promise<IBookComment> {
    return this.bookCommentModel.create(bookComment);
  }

  update(id: string, data: IBookCommentUpdate): Promise<IBookComment | null> {
    return this.bookCommentModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: string): Promise<IBookComment | null> {
    return this.bookCommentModel.findById(id).exec();
  }

  getList(bookId: string): Promise<Array<IBookComment>> {
    return this.bookCommentModel.find({ bookId }).exec();
  }

  deleteById(id: string): Promise<IBookComment | null> {
    return this.bookCommentModel.findByIdAndDelete(id).exec();
  }
}
