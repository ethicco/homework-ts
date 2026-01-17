export interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export interface IBookCreate extends Omit<IBook, 'id'> {}

export interface IBookUpdate extends Partial<IBookCreate> {}
