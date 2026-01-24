import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { BookCommentsService } from './book-comments.service';

@WebSocketGateway(9000, { namespace: 'book-comments', cors: '*' })
export class BookCommentsGateway {
  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('get-all-comments')
  handleGetAllComments(@MessageBody('bookId') bookId: string) {
    return this.bookCommentsService.getList(bookId);
  }

  @SubscribeMessage('add-comment')
  handleAddComment(@MessageBody() data: { bookId: string; comment: string }) {
    return this.bookCommentsService.create(data);
  }
}
