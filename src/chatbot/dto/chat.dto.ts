import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsString()
  @IsOptional()
  welcomeMessage?: string;
}
