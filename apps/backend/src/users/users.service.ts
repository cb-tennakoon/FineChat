import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<Partial<UserDocument>> {
    // Validate inputs
    if (!username || !email || !password) {
      throw new BadRequestException(
        'Username, email, and password are required',
      );
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('Email already exists');
      }
      if (existingUser.username === username) {
        throw new ConflictException('Username already exists');
      }
    }

    // Create new user
    const user = new this.userModel({
      username,
      email,
      password, // Will be hashed by the pre-save hook
    });

    await user.save();

    // Return user without password
    const { password: _, ...result } = user.toObject();
    return result;
  }
}
