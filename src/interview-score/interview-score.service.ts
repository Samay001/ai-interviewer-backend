// src/openai/openai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class InterviewScoreService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async analyzeInterview(text: string): Promise<{ score: number; conclusion: string }> {
        const prompt = `
  You are an interview evaluator.
  Based on this conversation between an admin and an applicant, provide:
  1) An overall score out of 5 (numeric only).
  2) A short conclusion that summarizes the applicant's strong points and weak points.
  Conversation:
  """${text}"""
  Respond in JSON format like:
  {
    "score": 3,
    "conclusion": "Strong communication, needs improvement in technical depth."
  }
  Do NOT wrap it in markdown. Respond with pure JSON only.
  `;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        let response = completion.choices[0].message.content;

        if (response) {
            response = response.replace(/```json|```/g, '').trim();
        } else {
            throw new Error('No response content from OpenAI.');
        }

        try {
            return JSON.parse(response);
        } catch (e) {
            throw new Error(`Invalid JSON response from OpenAI: ${response}`);
        }
    }
}
