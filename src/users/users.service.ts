import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async addInterviewToUser(email: string, interviewId: string): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      { $push: { interviews: interviewId } },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return updatedUser;
  }

  async getInterviews(id: string): Promise<any[]> {
    const userInterviews = await this.userModel
      .findById(id)
      .populate('interviews')
      .exec();

    if (!userInterviews) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return userInterviews.interviews;
  }
}
