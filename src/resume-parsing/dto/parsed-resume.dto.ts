import { ApiProperty } from '@nestjs/swagger';

export class ParsedResumeDto {
  @ApiProperty({ description: 'Full text content of the resume' })
  text: string;

  @ApiProperty({ description: 'Extracted email addresses', type: [String] })
  emails: string[];

  @ApiProperty({ description: 'Extracted phone numbers', type: [String] })
  phones: string[];

  @ApiProperty({ description: 'Extracted skills', type: [String] })
  skills: string[];

  @ApiProperty({ description: 'Extracted work experience', type: [String] })
  experience: string[];

  @ApiProperty({ description: 'Extracted education information', type: [String] })
  education: string[];

  @ApiProperty({ description: 'Extracted name', required: false })
  name?: string;

  @ApiProperty({ description: 'Extracted location', required: false })
  location?: string;
}