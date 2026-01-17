import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { IBook, IBookCreate, IBookUpdate } from 'src/common/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  create(book: IBookCreate): Promise<IBook> {
    return this.bookModel.create(book);
  }

  update(id: string, data: IBookUpdate): Promise<IBook | null> {
    return this.bookModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: string): Promise<IBook | null> {
    return this.bookModel.findById(id).exec();
  }

  getList(): Promise<Array<IBook>> {
    return this.bookModel.find().exec();
  }

  deleteById(id: string): Promise<IBook | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
