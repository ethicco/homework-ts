import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../../common/database';
import { IBook, IBookCreate, IBookUpdate } from '../../common/interfaces';
@Injectable()
export class BooksService {
  constructor(private readonly repository: BooksRepository) {}

  create(book: IBookCreate): Promise<IBook> {
    return this.repository.create(book);
  }

  update(id: string, data: IBookUpdate): Promise<IBook | null> {
    return this.repository.update(id, data);
  }

  getById(id: string): Promise<IBook | null> {
    return this.repository.getById(id);
  }

  getList(): Promise<Array<IBook>> {
    return this.repository.getList();
  }

  deleteById(id: string): Promise<IBook | null> {
    return this.repository.deleteById(id);
  }
}
