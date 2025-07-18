import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { SpeechService } from './speech.service';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post('text-to-speech')
  async textToSpeech(
    @Body('text') text: string,
    @Query('voice') voice: string = 'alloy',
    @Res() res: Response,
  ) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }

    try {
      const audioBuffer = await this.speechService.textToSpeech(text, voice);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="speech.mp3"',
        'Content-Length': audioBuffer.length,
      });

      res.send(audioBuffer);
    } catch (error) {
      throw new BadRequestException(
        `Text-to-speech conversion failed: ${error.message}`,
      );
    }
  }

  @Post('speech-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  async speechToText(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('MP3 audio file is required');
    }

    // Validate that it's an MP3 file
    if (file.mimetype !== 'audio/mpeg' && file.mimetype !== 'audio/mp3') {
      throw new BadRequestException('Only MP3 audio files are supported');
    }

    try {
      const transcription = await this.speechService.speechToText(file);

      return {
        success: true,
        transcription,
        filename: file.originalname,
        size: file.size,
        format: 'mp3',
      };
    } catch (error) {
      throw new BadRequestException(
        `Speech-to-text conversion failed: ${error.message}`,
      );
    }
  }
}
