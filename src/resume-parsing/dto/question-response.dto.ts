import { ApiProperty } from '@nestjs/swagger';

export class QuestionsResponseDto {
  @ApiProperty({ description: 'Generated interview questions', type: [String] })
  questions: string[];

  @ApiProperty({ description: 'Number of questions generated' })
  count: number;
}