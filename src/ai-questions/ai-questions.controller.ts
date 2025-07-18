// src/questions/questions.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './ai-questions.service';
import { CreateQuestionDto } from './dto/create-questions.dto';

@Controller('generate-questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async generate(@Body() dto: CreateQuestionDto) {
    const questions = await this.questionsService.generateQuestions(dto);
    return {
      domain: dto.domain,
      questions,
    };
  }
}
