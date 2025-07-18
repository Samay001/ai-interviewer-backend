import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResumeController } from './resume-parsing.controller';
import { ResumeService } from './resume-parsing.service';

@Module({
  imports: [ConfigModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}