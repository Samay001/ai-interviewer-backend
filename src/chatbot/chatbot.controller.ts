import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto } from './dto/chat.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  async chat(@Body(ValidationPipe) chatDto: ChatMessageDto) {
    return await this.chatbotService.sendMessage(chatDto);
  }

  @Get('welcome')
  async getWelcomeMessage() {
    return await this.chatbotService.getWelcomeMessage();
  }
}
