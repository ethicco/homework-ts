import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [];

  findAll() {
    return this.books;
  }
}
