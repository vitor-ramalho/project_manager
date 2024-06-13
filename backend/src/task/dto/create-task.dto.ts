import {
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  completionDate?: Date;

  @IsBoolean()
  isCompleted?: boolean;

  @IsNumber()
  projectId: number;
}
