import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { InterviewScheduleService } from './interview-schedule.service';
import { CreateInterviewScheduleDto } from './dto/create-interview-schedule.dto';
import { UpdateScoreStatusDto } from './dto/update-score-status.dto';
import { InterviewSchedule } from './schemas/interview-schedule.schema';

@ApiTags('interview-schedule')
@Controller('interview-schedule')
export class InterviewScheduleController {
  constructor(
    private readonly interviewScheduleService: InterviewScheduleService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new interview schedule' })
  @ApiResponse({
    status: 201,
    description: 'Interview schedule created successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async create(
    @Body() createInterviewScheduleDto: CreateInterviewScheduleDto,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.create(createInterviewScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interview schedules' })
  @ApiResponse({
    status: 200,
    description: 'List of all interview schedules',
    type: [InterviewSchedule],
  })
  async findAll(): Promise<InterviewSchedule[]> {
    return this.interviewScheduleService.findAll();
  }

  @Get('admin/:email')
  @ApiOperation({ summary: 'Get interview schedules by admin email' })
  @ApiParam({ name: 'email', description: 'Admin email address' })
  @ApiResponse({
    status: 200,
    description: 'List of interview schedules for the admin',
    type: [InterviewSchedule],
  })
  async findByAdminEmail(
    @Param('email') email: string,
  ): Promise<InterviewSchedule[]> {
    return this.interviewScheduleService.findByAdminEmail(email);
  }

  @Get('applicant/:email')
  @ApiOperation({ summary: 'Get interview schedules by applicant email' })
  @ApiParam({ name: 'email', description: 'Applicant email address' })
  @ApiResponse({
    status: 200,
    description: 'List of interview schedules for the applicant',
    type: [InterviewSchedule],
  })
  async findByApplicantEmail(
    @Param('email') email: string,
  ): Promise<InterviewSchedule[]> {
    return this.interviewScheduleService.findByApplicantEmail(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get interview schedule by ID' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview schedule details',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async findOne(@Param('id') id: string): Promise<InterviewSchedule> {
    return this.interviewScheduleService.findOne(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update interview schedule status' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiQuery({
    name: 'status',
    description: 'New status (upcoming, completed)',
    enum: ['upcoming', 'completed'],
  })
  @ApiResponse({
    status: 200,
    description: 'Status updated successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: string,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.updateStatus(id, status);
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark interview schedule as completed' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview marked as completed',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async markAsCompleted(@Param('id') id: string): Promise<InterviewSchedule> {
    return this.interviewScheduleService.markAsCompleted(id);
  }

  @Patch(':id/score')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update interview score' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiQuery({
    name: 'score',
    description: 'Interview score (1-5)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Score updated successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async updateScore(
    @Param('id') id: string,
    @Query('score') score: number,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.updateScore(id, score);
  }

  @Patch(':id/score-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update interview score and status' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiBody({
    description: 'Score and status update data',
    type: UpdateScoreStatusDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Score and status updated successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  async updateScoreAndStatus(
    @Param('id') id: string,
    @Body() updateScoreStatusDto: UpdateScoreStatusDto,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.updateScoreAndStatus(
      id,
      updateScoreStatusDto.score,
      updateScoreStatusDto.interviewStatus,
    );
  }

  @Patch(':id/result')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update interview result' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiQuery({
    name: 'result',
    description: 'Interview result (accept, reject)',
    enum: ['accept', 'reject'],
  })
  @ApiResponse({
    status: 200,
    description: 'Result updated successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async updateResult(
    @Param('id') id: string,
    @Query('result') result: string,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.updateResult(id, result);
  }

  @Patch(':id/transcript')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update interview transcript' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiBody({
    description: 'Interview transcript',
    schema: {
      type: 'object',
      properties: {
        transcript: {
          type: 'string',
          description: 'Complete interview transcript',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Transcript updated successfully',
    type: InterviewSchedule,
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async updateTranscript(
    @Param('id') id: string,
    @Body('transcript') transcript: string,
  ): Promise<InterviewSchedule> {
    return this.interviewScheduleService.updateTranscript(id, transcript);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete interview schedule' })
  @ApiParam({ name: 'id', description: 'Interview schedule ID' })
  @ApiResponse({
    status: 204,
    description: 'Interview schedule deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Interview schedule not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.interviewScheduleService.remove(id);
  }
}