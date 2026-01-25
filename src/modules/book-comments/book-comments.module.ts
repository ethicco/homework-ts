import { Module } from '@nestjs/common';
import { BookCommentsController } from './book-comments.controller';
import { BookCommentsService } from './book-comments.service';
import { DatabaseModule } from '../../common/database/database.module';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [BookCommentsController],
  providers: [BookCommentsService, BookCommentsGateway],
})
export class BookCommentsModule {}
