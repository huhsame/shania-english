import { IsString, IsOptional } from 'class-validator';

export class UpdateUserInfoDto {
  @IsString()
  personalizationInfo: string;

  @IsOptional()
  @IsString()
  goodNoteEmail?: string;
} 