import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpeechService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async textToSpeech(text: string, voice: string = 'alloy'): Promise<Buffer> {
    try {
      const mp3 = await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: voice as any,
        input: text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      return buffer;
    } catch (error) {
      throw new BadRequestException(`Text-to-speech failed: ${error.message}`);
    }
  }

  async speechToText(audioFile: Express.Multer.File): Promise<string> {
    try {
      // Create a temporary file path with .mp3 extension
      const tempFileName = `audio_${Date.now()}.mp3`;
      const tempFilePath = path.join(process.cwd(), 'temp', tempFileName);

      // Ensure temp directory exists
      const tempDir = path.dirname(tempFilePath);
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Write the MP3 audio buffer to temp location
      fs.writeFileSync(tempFilePath, audioFile.buffer);

      // Create a readable stream for OpenAI Whisper
      const transcription = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: 'whisper-1',
        response_format: 'text',
      });

      // Clean up temp file
      fs.unlinkSync(tempFilePath);

      return transcription;
    } catch (error) {
      throw new BadRequestException(`Speech-to-text failed: ${error.message}`);
    }
  }
}
