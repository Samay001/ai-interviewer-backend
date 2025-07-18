import { Controller, Post, Body } from '@nestjs/common';
import { InterviewScoreService } from './interview-score.service';

@Controller('interview')
export class InterviewScoreController {
  constructor(private readonly interviewScoreService: InterviewScoreService) {}

  @Post('analyze')
  async analyze(@Body('text') text: string) {
    return this.interviewScoreService.analyzeInterview(text);
  }
}
