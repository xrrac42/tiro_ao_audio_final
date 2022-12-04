// src/answers/answers.module.ts

import { Module } from '@nestjs/common';
import { AnswerService } from './answers.service';
import { AnswerController } from './answers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [PrismaModule],
})
export class AnswersModule {}
