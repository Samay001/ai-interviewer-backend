import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto, LoginDto, AuthResponse, UserResponse, JwtPayload } from '../auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { firstName, lastName, email, password, role, phoneNumber } = registerDto;

    // Check if user already exists
    const existingUser: UserDocument | null = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds: number = 12;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    // Create user
    const user: UserDocument = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    const savedUser: UserDocument = await user.save();

    // Generate JWT token
    const payload: JwtPayload = { sub: (savedUser._id as any).toString() };
    const token: string = this.jwtService.sign(payload);

    // Return user without password
    const userResponse: UserResponse = {
      id: (savedUser._id as import('mongoose').Types.ObjectId).toString(),
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      role: savedUser.role,
      phoneNumber: savedUser.phoneNumber,
    };

    return { token, user: userResponse };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    // Find user by email
    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload: JwtPayload = { sub: (user._id as string).toString() };
    const token: string = this.jwtService.sign(payload);

    // Return user without password
    const userResponse: UserResponse = {
      id: (user._id as any).toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };

    return { token, user: userResponse };
  }

  async validateUser(id: string): Promise<UserResponse | null> {
    const user: UserDocument | null = await this.userModel.findById(id);
    if (user) {
      return {
        id: (user._id as any).toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      };
    }
    return null;
  }
}