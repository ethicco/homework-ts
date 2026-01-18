export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserCreate extends Omit<IUser, 'id'> {}

export interface IUserUpdate extends Partial<IUserCreate> {}
