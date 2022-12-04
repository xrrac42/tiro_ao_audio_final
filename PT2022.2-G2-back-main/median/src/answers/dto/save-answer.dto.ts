import { PartialType, PickType } from '@nestjs/mapped-types';
import { AnswerEntity } from '../entities/answer.entity';

export class SaveAnswerDto extends PartialType(
  PickType(AnswerEntity, ['content']),
) {}
