// src/questions/questions.module.ts
import { Module } from '@nestjs/common';
import { EmailController } from './result-email.controller';
import { MailService } from './result-email.service';

@Module({
  controllers: [EmailController],
  providers: [MailService],
})
export class EmailModule {}
