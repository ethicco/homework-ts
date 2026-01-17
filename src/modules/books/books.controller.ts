import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { IBook, IBookCreate, IBookUpdate } from 'src/common/interfaces';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { schemaBook } from './schema/book.schema';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { HandleInterceptor } from 'src/common/interceptors/handle.interceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HandleInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body(new ValidationPipe(schemaBook)) book: IBookCreate,
  ): Promise<IBook> {
    return this.booksService.create(book);
  }

  @Put()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(new ValidationPipe(schemaBook)) data: IBookUpdate,
  ): Promise<IBook | null> {
    return this.booksService.update(id, data);
  }

  @Get(':id')
  getById(@Param('id', ParseObjectIdPipe) id: string): Promise<IBook | null> {
    return this.booksService.getById(id);
  }

  @Get()
  getList(): Promise<Array<IBook>> {
    return this.booksService.getList();
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IBook | null> {
    return this.booksService.deleteById(id);
  }
}
