import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechModule } from './speech/speech.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ChatbotModule } from './chatbot/chatbot.module';
import { InterviewScheduleModule } from './interview-schedule/interview-schedule.module';
import { QuestionsModule } from './ai-questions/ai-questions.module';
import { ResumeModule } from './resume-parsing/resume-parsing.module';
import { UserSchema } from './users/schemas/user.schema';
import { InterviewScheduleSchema } from './interview-schedule';
import { InterviewScoreModule } from './interview-score/interview-score.module';
import {EmailModule} from './result-email/result-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost/ai-interviewer',
    ),
    SpeechModule,
    UsersModule,
    AuthModule,
    ChatbotModule,
    InterviewScheduleModule,
    QuestionsModule,
    ResumeModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'InterviewSchedule', schema: InterviewScheduleSchema }, 
    ]),
    InterviewScoreModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
