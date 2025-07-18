import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewScheduleController } from './interview-schedule.controller';
import { InterviewScheduleService } from './interview-schedule.service';
import {
  InterviewSchedule,
  InterviewScheduleSchema,
} from './schemas/interview-schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewSchedule.name, schema: InterviewScheduleSchema },
    ]),
  ],
  controllers: [InterviewScheduleController],
  providers: [InterviewScheduleService],
  exports: [InterviewScheduleService],
})
export class InterviewScheduleModule {}
