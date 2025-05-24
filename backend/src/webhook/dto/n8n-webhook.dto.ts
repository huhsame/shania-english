import { IsString, IsEmail, IsOptional, IsUrl } from 'class-validator';

export class N8nWebhookDto {
  @IsUrl()
  url: string;

  @IsString()
  personalization: string;

  @IsEmail()
  googleEmail: string;

  @IsOptional()
  @IsEmail()
  goodNoteEmail?: string;

  @IsString()
  userId: string;
} 