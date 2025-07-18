// src/questions/dto/create-question.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  domain: string;
}
