export interface IBookComment {
  id: string;
  bookId: string;
  comment: string;
}

export interface IBookCommentCreate extends Omit<IBookComment, 'id'> {}

export interface IBookCommentUpdate extends Partial<IBookCommentCreate> {}
