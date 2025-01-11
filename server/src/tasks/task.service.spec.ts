import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: jest.Mocked<Repository<TaskEntity>>;

  const taskPayload: TaskEntity = {
    id: 1,
    projectId: 1,
    name: faker.lorem.word(),
    checked: false,
    priority: 'any',
    dueDate: new Date(),
    ownerUserId: 1,
    responsibleUserId: 1,
  };

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(TasksService).compile();

    tasksService = unit;
    taskRepository = unitRef.get('TASK_REPOSITORY');
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('create()', () => {
    it('should call task repository with correct payload', async () => {
      const createTaskDto: CreateTaskDto = {
        name: faker.lorem.word(),
        checked: false,
        priority: 'any',
        dueDate: new Date(),
        ownerUserId: 1,
        responsibleUserId: 1,
      };
      await tasksService.create(createTaskDto);

      expect(taskRepository.save).toHaveBeenCalledTimes(1);
      expect(taskRepository.save).toHaveBeenCalledWith(createTaskDto);
    });

    it('should create a task', async () => {
      taskRepository.save.mockResolvedValue({
        ...taskPayload,
      });
      const task = await tasksService.create({
        name: faker.lorem.word(),
        checked: false,
        priority: 'any',
        dueDate: new Date(),
        ownerUserId: 1,
        responsibleUserId: 1,
      });

      expect(task.id).toEqual(taskPayload.id);
      expect(task.name).toEqual(taskPayload.name);
    });
  });

  describe('findAll()', () => {
    it('should call task repository with correct project ID', async () => {
      await tasksService.findAll(1);

      expect(taskRepository.find).toHaveBeenCalledTimes(1);
      expect(taskRepository.find).toHaveBeenCalledWith({
        where: { projectId: 1 },
      });
    });

    it('should return a list of tasks', async () => {
      taskRepository.find.mockResolvedValue([taskPayload]);
      const tasks = await tasksService.findAll(1);

      expect(tasks).toBeInstanceOf(Array);
      expect(tasks.length).toEqual(1);
    });
  });

  describe('findOne()', () => {
    it('should return a task by ID', async () => {
      taskRepository.findOne.mockResolvedValue(taskPayload);

      const task = await tasksService.findOne(1);

      expect(task.id).toEqual(taskPayload.id);
      expect(task.name).toEqual(taskPayload.name);
    });
  });

  describe('update()', () => {
    it('should call repository with correct params', async () => {
      const updateTaskDto: UpdateTaskDto = { name: 'Updated Task' };
      taskRepository.update.mockResolvedValue({} as any);

      await tasksService.update(1, updateTaskDto);

      expect(taskRepository.update).toHaveBeenCalledTimes(1);
      expect(taskRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        updateTaskDto,
      );
    });
  });

  describe('remove()', () => {
    it('should call repository with correct params', async () => {
      taskRepository.delete.mockResolvedValue({} as any);

      await tasksService.remove(1);

      expect(taskRepository.delete).toHaveBeenCalledTimes(1);
      expect(taskRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
