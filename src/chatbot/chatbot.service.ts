import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatMessageDto } from './dto/chat.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;
  private config: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });

    // Load configuration from JSON file
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      const configPath = path.join(process.cwd(), 'src', 'chatbot', 'data', 'chatbot-config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      this.config = JSON.parse(configData);
      // console.log('Chatbot configuration loaded successfully:', this.config);
    } catch (error) {
      console.warn('Could not load config file:', error.message);
    }
  }

  async sendMessage(chatDto: ChatMessageDto): Promise<any> {
    try {
      // Always use chatbot_context from config
      let context = '';
      if (this.config?.chatbot_context) {
        context = typeof this.config.chatbot_context === 'string'
          ? this.config.chatbot_context
          : JSON.stringify(this.config.chatbot_context);
          // console.log('Using context:', context);
      }

      // Build the conversation with system message and history
      const messages = [
        {
          role: 'system',
          content: `${context}\n\nYou are edmo's assistant and you should be helpful and friendly}.`,
        },
        {
          role: 'user',
          content: chatDto.message,
        },
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages as any,
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;

      return {
        success: true,
        response: response,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get response: ${error.message}`);
    }
  }

  getWelcomeMessage(): string {
    return this.config?.welcome_message || 'Welcome!';
  }
}
