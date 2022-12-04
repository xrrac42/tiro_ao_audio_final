import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question as QuestionModel } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async createQuestion(
    @Body()
    questionData:{
      title: string;
      description: string;
      archived: boolean;
      
    },
  ): Promise<QuestionModel>{ 
    return this.questionsService.createQuestion(questionData);
  }

  @Get()
  async getAllAnswer(): Promise<QuestionModel[]> {
    return this.questionsService.questions({ skip: 0 });
  }

  @Patch()
  async updateQuestion(
    @Body('question_id')
    question_id: {
      id: number
    },
    @Body('question_data')
    question_data: {
      title: string;
      description: string;
      archived: boolean
    },
  ): Promise<QuestionModel> {
    return this.questionsService.updateQuestion({
      where: question_id,
      data: question_data,
    });
  }
  @Delete(':id')
  
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.questionsService.deleteQuestion({id});
  }
}

