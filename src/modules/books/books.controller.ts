import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { IBook, IBookCreate, IBookUpdate } from '../../common/interfaces';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { schemaBook } from './schema/book.schema';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { HandleInterceptor } from '../../common/interceptors/handle.interceptor';
import { JwtAuthGuard } from '../../common/guard';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HandleInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe(schemaBook)) book: IBookCreate,
  ): Promise<IBook> {
    return this.booksService.create(book);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IBook | null> {
    return this.booksService.deleteById(id);
  }
}
