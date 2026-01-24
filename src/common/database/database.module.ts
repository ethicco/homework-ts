import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import {
  BookCommentsRepository,
  BooksRepository,
  UsersRepository,
} from './repositories';
import { User, UserSchema } from './schemas/user.schema';
import { BookComment, BookCommentSchema } from './schemas/book-coment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: User.name, schema: UserSchema },
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BooksRepository, UsersRepository, BookCommentsRepository],
  exports: [BooksRepository, UsersRepository, BookCommentsRepository],
})
export class DatabaseModule {}
