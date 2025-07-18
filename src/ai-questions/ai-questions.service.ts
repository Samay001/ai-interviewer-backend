// src/questions/questions.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { CreateQuestionDto } from './dto/create-questions.dto';

@Injectable()
export class QuestionsService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateQuestions(dto: CreateQuestionDto): Promise<string[]> {
    const { domain } = dto;

    const prompt = `Generate 5 random and relevant interview questions for a candidate applying for a role in ${domain}. Return them as a numbered list.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = response.choices[0].message?.content || '';

    // Parse questions from output
    return output
      .split('\n')
      .filter((line) => line.trim())
      .map((q) => q.replace(/^\d+[\).]?\s*/, ''));
  }
}
