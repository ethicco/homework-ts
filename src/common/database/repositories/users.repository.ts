import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { IUser, IUserCreate, IUserUpdate } from 'src/common/interfaces';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(user: IUserCreate): Promise<IUser> {
    return this.userModel.create(user);
  }

  update(id: string, data: IUserUpdate): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  getList(): Promise<Array<IUser>> {
    return this.userModel.find().exec();
  }

  deleteById(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
