import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InterviewSchedule,
  InterviewScheduleDocument,
} from './schemas/interview-schedule.schema';
import { CreateInterviewScheduleDto } from './dto/create-interview-schedule.dto';

@Injectable()
export class InterviewScheduleService {
  constructor(
    @InjectModel(InterviewSchedule.name)
    private interviewScheduleModel: Model<InterviewScheduleDocument>,
  ) {}

  async create(
    createInterviewScheduleDto: CreateInterviewScheduleDto,
  ): Promise<InterviewSchedule> {
    // Set default empty strings for missing fields
    const scheduleData = {
      adminFirstName: createInterviewScheduleDto.adminFirstName || '',
      adminLastName: createInterviewScheduleDto.adminLastName || '',
      adminEmail: createInterviewScheduleDto.adminEmail || '',
      applicantFirstName: createInterviewScheduleDto.applicantFirstName || '',
      applicantLastName: createInterviewScheduleDto.applicantLastName || '',
      applicantEmail: createInterviewScheduleDto.applicantEmail || '',
      date: createInterviewScheduleDto.date || '',
      time: createInterviewScheduleDto.time || '',
      interviewDomain: createInterviewScheduleDto.interviewDomain || '',
      customQuestions: createInterviewScheduleDto.customQuestions || [],
      aiGeneratedQuestions: createInterviewScheduleDto.aiGeneratedQuestions || [],
      interviewTranscript: createInterviewScheduleDto.interviewTranscript || '',
      score: createInterviewScheduleDto.score || 0,
      scheduleType: createInterviewScheduleDto.scheduleType || 'manual',
      interviewStatus: createInterviewScheduleDto.interviewStatus || 'upcoming',
      interviewResult: createInterviewScheduleDto.interviewResult || '',
    };

    const createdInterviewSchedule = new this.interviewScheduleModel(scheduleData);
    return createdInterviewSchedule.save();
  }

  async findAll(): Promise<InterviewSchedule[]> {
    return this.interviewScheduleModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<InterviewSchedule> {
    const interviewSchedule = await this.interviewScheduleModel
      .findById(id)
      .exec();
    if (!interviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return interviewSchedule;
  }

  async findByAdminEmail(adminEmail: string): Promise<InterviewSchedule[]> {
    return this.interviewScheduleModel
      .find({ adminEmail })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByApplicantEmail(
    applicantEmail: string,
  ): Promise<InterviewSchedule[]> {
    return this.interviewScheduleModel
      .find({ applicantEmail })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<InterviewSchedule> {
    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(id, { interviewStatus: status }, { new: true })
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async markAsCompleted(id: string): Promise<InterviewSchedule> {
    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(
        id,
        { interviewStatus: 'completed' },
        { new: true },
      )
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async updateScore(id: string, score: number): Promise<InterviewSchedule> {
    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(id, { score }, { new: true })
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async updateResult(id: string, result: string): Promise<InterviewSchedule> {
    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(id, { interviewResult: result }, { new: true })
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async updateTranscript(id: string, transcript: string): Promise<InterviewSchedule> {
    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(id, { interviewTranscript: transcript }, { new: true })
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async updateScoreAndStatus(
    id: string,
    score?: number,
    interviewStatus?: string,
  ): Promise<InterviewSchedule> {
    const updateData: any = {};
    
    if (score !== undefined) {
      updateData.score = score;
    }
    
    if (interviewStatus !== undefined) {
      updateData.interviewStatus = interviewStatus;
    }

    const updatedInterviewSchedule = await this.interviewScheduleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedInterviewSchedule) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
    return updatedInterviewSchedule;
  }

  async remove(id: string): Promise<void> {
    const result = await this.interviewScheduleModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(`Interview schedule with ID ${id} not found`);
    }
  }
}