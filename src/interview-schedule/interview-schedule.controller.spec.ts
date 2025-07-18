import { Test, TestingModule } from '@nestjs/testing';
import { InterviewScheduleController } from './interview-schedule.controller';
import { InterviewScheduleService } from './interview-schedule.service';

describe('InterviewScheduleController', () => {
  let controller: InterviewScheduleController;
  let service: InterviewScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewScheduleController],
      providers: [
        {
          provide: InterviewScheduleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByAdminEmail: jest.fn(),
            findByApplicantEmail: jest.fn(),
            updateStatus: jest.fn(),
            markAsCompleted: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InterviewScheduleController>(InterviewScheduleController);
    service = module.get<InterviewScheduleService>(InterviewScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service defined', () => {
    expect(service).toBeDefined();
  });
}); 