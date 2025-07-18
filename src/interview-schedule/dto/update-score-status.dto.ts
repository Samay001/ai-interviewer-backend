import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Max, IsIn } from 'class-validator';

export class UpdateScoreStatusDto {
  @ApiProperty({
    description: 'Interview score (0-5)',
    minimum: 0,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  score?: number;

  @ApiProperty({
    description: 'Interview status',
    enum: ['upcoming', 'completed'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['upcoming', 'completed'])
  interviewStatus?: string;
} 