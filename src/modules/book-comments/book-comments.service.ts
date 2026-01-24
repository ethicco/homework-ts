import { Injectable } from '@nestjs/common';
import { BookCommentsRepository } from '../../common/database';
import {
  IBookComment,
  IBookCommentCreate,
  IBookCommentUpdate,
} from '../../common/interfaces';

@Injectable()
export class BookCommentsService {
  constructor(private readonly repository: BookCommentsRepository) {}

  create(bookComment: IBookCommentCreate): Promise<IBookComment> {
    return this.repository.create(bookComment);
  }

  update(id: string, data: IBookCommentUpdate): Promise<IBookComment | null> {
    return this.repository.update(id, data);
  }

  getById(id: string): Promise<IBookComment | null> {
    return this.repository.getById(id);
  }

  getList(bookId: string): Promise<Array<IBookComment>> {
    return this.repository.getList(bookId);
  }

  deleteById(id: string): Promise<IBookComment | null> {
    return this.repository.deleteById(id);
  }
}
