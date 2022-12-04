import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { AnswerService } from './answers.service';
import { Answer as AnswerModel } from '@prisma/client';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswer(
    @Body()
    answerData: {
      question: any;
      user: any;
      content: string;
    },
  ): Promise<AnswerModel> {
    return this.answerService.createAnswer(answerData);
  }

  @Get()
  async getAllAnswer(): Promise<AnswerModel[]> {
    return this.answerService.answers({ skip: 0 });
  }

  @Get('byId')
  async getAnswerById(
    @Body()
    question_user: {
      id_question: number;
      id_user: string;
    },
  ): Promise<AnswerModel> {
    return this.answerService.answer({ question_user });
  }

  @Patch()
  async updateAnswer(
    @Body()
    question_user: {
      id_question: number;
      id_user: string;
    },
    answerData: {
      question: any;
      user: any;
      content: string;
    },
  ): Promise<AnswerModel> {
    return this.answerService.updateAnswer({
      where: { question_user },
      data: answerData,
    });
  }

  @Delete()
  async deleteAnswer(
    @Body()
    question_user: {
      id_question: number;
      id_user: string;
    },
  ): Promise<AnswerModel> {
    return this.answerService.deleteanswer({ question_user });
  }
}
