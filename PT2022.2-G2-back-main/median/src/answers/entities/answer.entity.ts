import { Answer } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { TransformDate } from '../decorators/transform-date.decorator';

export class AnswerEntity implements Answer {
  @IsNumber()
  @IsNotEmpty()
  id_question: number;

  @IsString()
  @IsNotEmpty()
  id_user: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsDate()
  @TransformDate()
  updated_at: Date;
}
