import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InterviewScheduleDocument = InterviewSchedule & Document;

@Schema({ timestamps: true })
export class InterviewSchedule {
  @Prop({ default: '' })
  adminFirstName: string;

  @Prop({ default: '' })
  adminLastName: string;

  @Prop({ default: '' })
  adminEmail: string;

  @Prop({ default: '' })
  applicantFirstName: string;

  @Prop({ default: '' })
  applicantLastName: string;

  @Prop({ default: '' })
  applicantEmail: string;

  @Prop({ default: '' })
  date: string;

  @Prop({ default: '' })
  time: string;

  @Prop({ default: '' })
  interviewDomain: string;

  @Prop({ type: [String], default: [] })
  customQuestions: string[];

  @Prop({ type: [String], default: [] })
  aiGeneratedQuestions: string[];

  @Prop({ default: '' })
  interviewTranscript: string;

  @Prop({ default: 0, min: 0, max: 5 })
  score: number;

  @Prop({ default: 'manual', enum: ['manual', 'ai'] })
  scheduleType: string;

  @Prop({ default: 'upcoming', enum: ['upcoming', 'completed'] })
  interviewStatus: string;

  @Prop({ default: '', enum: ['', 'accept', 'reject'] })
  interviewResult: string;
}

export const InterviewScheduleSchema =
  SchemaFactory.createForClass(InterviewSchedule);