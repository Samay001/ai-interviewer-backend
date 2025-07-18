import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      limits: {
        fileSize: 25 * 1024 * 1024, // 25MB limit (OpenAI's limit)
      },
    }),
  ],
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
