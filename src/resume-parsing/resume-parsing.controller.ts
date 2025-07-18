import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume-parsing.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { GenerateQuestionsDto } from './dto/generate-questions.dto';
import { ParsedResumeDto } from './dto/parsed-resume.dto';
import { QuestionsResponseDto } from './dto/question-response.dto';

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('parse')
  @ApiOperation({ summary: 'Parse resume file and extract information' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Resume parsed successfully', type: ParsedResumeDto })
  @ApiResponse({ status: 400, description: 'Invalid file format or size' })
  @UseInterceptors(FileInterceptor('file'))
  async parseResume(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ParsedResumeDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      return await this.resumeService.parse(file.buffer);
    } catch (error) {
      throw new BadRequestException('Failed to parse resume: ' + error.message);
    }
  }

  @Post('questions')
  @ApiOperation({ summary: 'Generate interview questions from resume text' })
  @ApiResponse({ status: 200, description: 'Questions generated successfully', type: QuestionsResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid or empty text provided' })
  async generateQuestions(@Body() dto: GenerateQuestionsDto): Promise<QuestionsResponseDto> {
    try {
      const questions = await this.resumeService.generateQuestionsFromText(dto.text);
      return {
        questions,
        count: questions.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to generate questions: ' + error.message);
    }
  }
}