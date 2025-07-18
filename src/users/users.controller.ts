import {
  Controller,
  Put,
  Body,
  BadRequestException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Put('add-interview')
  async addInterviewToUser(
    @Body() body: { email: string; interviewId: string }
  ) {
    const { email, interviewId } = body;
    if (!email || !interviewId) {
      throw new BadRequestException('Email and interviewId are required');
    }
    return this.usersService.addInterviewToUser(email, interviewId);
  }

  @Get('/getUserInterviews/:id')
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param('id') id: string): Promise<any[]> {  
    const res = await this.usersService.getInterviews(id);
    if (!res) {
      throw new BadRequestException('User not found');
    }
    return res;
  }

}
