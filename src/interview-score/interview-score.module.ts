// src/openai/openai.module.ts
import { Module } from '@nestjs/common';
import { InterviewScoreService } from './interview-score.service';
import { InterviewScoreController } from './interview-score.controller';

@Module({
  controllers: [InterviewScoreController],
  providers: [  InterviewScoreService ],
})
export class InterviewScoreModule {}
