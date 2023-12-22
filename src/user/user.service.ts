import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = await hash(user.password, 10);
    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    const result = await createdUser.save();
    return result
  }

  async findByEmail(email: string): Promise<any | null> {
    const data = await this.userModel.findOne({ email });
    if (data) return data;
    return null;
  }
   async updatePassword (email:string, password: string):Promise<any | null> {
    const foundUser = await this.findByEmail(email);
    if(!foundUser){
      throw new NotFoundException('User not Found');
    }
    const userId = foundUser._id
    const hashedPassword= await hash(password, 10);

    let result = await this.userModel.findByIdAndUpdate(userId, {password: hashedPassword},{
      new: true,
    });
    
    return result;
   }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
