// src/questions/questions.module.ts
import { Module } from '@nestjs/common';
import { QuestionsController } from './ai-questions.controller';
import { QuestionsService } from './ai-questions.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
