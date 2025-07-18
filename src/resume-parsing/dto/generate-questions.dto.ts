import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateQuestionsDto {
  @ApiProperty({
    description: 'Resume text content',
    example: 'John Doe\nSoftware Engineer\nExperience with React, Node.js...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  text: string;
}