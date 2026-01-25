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
import { BookCommentsService } from './book-comments.service';
import type {
  IBookComment,
  IBookCommentCreate,
  IBookCommentUpdate,
} from '../../common/interfaces';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { HandleInterceptor } from '../../common/interceptors/handle.interceptor';
import { JwtAuthGuard } from '../../common/guard';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HandleInterceptor)
@Controller('book-comments')
export class BookCommentsController {
  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() book: IBookCommentCreate): Promise<IBookComment> {
    return this.bookCommentsService.create(book);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: IBookCommentUpdate,
  ): Promise<IBookComment | null> {
    return this.bookCommentsService.update(id, data);
  }

  @Get(':id')
  getById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IBookComment | null> {
    return this.bookCommentsService.getById(id);
  }

  @Get()
  getList(bookId: string): Promise<Array<IBookComment>> {
    return this.bookCommentsService.getList(bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IBookComment | null> {
    return this.bookCommentsService.deleteById(id);
  }
}
