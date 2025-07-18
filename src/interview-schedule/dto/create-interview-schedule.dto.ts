import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInterviewScheduleDto {
  @ApiProperty({ description: 'Admin first name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  adminFirstName: string;

  @ApiProperty({ description: 'Admin last name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  adminLastName: string;

  @ApiProperty({ description: 'Admin email address' })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value || '')
  adminEmail: string;

  @ApiProperty({ description: 'Applicant first name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  applicantFirstName: string;

  @ApiProperty({ description: 'Applicant last name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  applicantLastName: string;

  @ApiProperty({ description: 'Applicant email address' })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value || '')
  applicantEmail: string;

  @ApiProperty({ description: 'Interview date (YYYY-MM-DD format)' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value || '')
  date: string;

  @ApiProperty({ description: 'Interview time (HH:MM format)' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  time: string;

  @ApiProperty({ description: 'Interview domain/topic' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  interviewDomain: string;

  @ApiPropertyOptional({
    description: 'Custom questions for the interview',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value || [])
  customQuestions?: string[];

  @ApiPropertyOptional({
    description: 'AI generated questions for the interview',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value || [])
  aiGeneratedQuestions?: string[];

  @ApiPropertyOptional({
    description: 'Interview transcript',
    example: 'Complete interview conversation transcript...',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  interviewTranscript?: string;

  @ApiPropertyOptional({
    description: 'Interview score (1-5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => value || 0)
  score?: number;

  @ApiPropertyOptional({
    description: 'Schedule type',
    enum: ['manual', 'ai'],
    example: 'manual',
  })
  @IsOptional()
  @IsEnum(['manual', 'ai'])
  @Transform(({ value }) => value || 'manual')
  scheduleType?: string;

  @ApiPropertyOptional({
    description: 'Interview status',
    enum: ['upcoming', 'completed'],
    example: 'upcoming',
  })
  @IsOptional()
  @IsEnum(['upcoming', 'completed'])
  @Transform(({ value }) => value || 'upcoming')
  interviewStatus?: string;

  @ApiPropertyOptional({
    description: 'Interview result',
    enum: ['accept', 'reject'],
    example: 'accept',
  })
  @IsOptional()
  @IsEnum(['accept', 'reject'])
  @Transform(({ value }) => value || '')
  interviewResult?: string;
}