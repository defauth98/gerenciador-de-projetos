import { faker } from '@faker-js/faker';
import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/user/entities/user.entity';

describe('UserService', () => {
  let projectService: ProjectService;
  let projectRepository: jest.Mocked<Repository<Project>>;
  let userRepository: jest.Mocked<Repository<User>>;

  const projectPayload: CreateProjectDto = {
    id: 1,
    advisorId: 1,
    coAdvisorId: 1,
    description: faker.person.bio(),
    dueDate: new Date(),
    theme: 'any theme',
    status: 'any status',
    title: 'any title',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userPayload: User = {
    id: 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userPayload2: User = {
    id: 2,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(ProjectService).compile();

    projectService = unit;
    projectRepository = unitRef.get('PROJECT_REPOSITORY');
    userRepository = unitRef.get('USER_REPOSITORY');
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('create()', () => {
    it('should call project repository with correct payload', async () => {
      await projectService.create(projectPayload);

      expect(projectRepository.save).toHaveBeenCalledTimes(1);
      expect(projectRepository.save).toHaveBeenCalledWith(projectPayload);
    });
    it('should create a project', async () => {
      projectRepository.save.mockResolvedValue({
        ...projectPayload,
        members: [],
      });
      const project = await projectService.create(projectPayload);

      expect(project.id).toEqual(projectPayload.id);
      expect(project.title).toEqual(projectPayload.title);
      expect(project.members).toEqual([]);
    });
  });
  describe('findAll()', () => {
    it('should call project repository with correct payload', async () => {
      await projectService.findAll();

      expect(projectRepository.find).toHaveBeenCalledTimes(1);
      expect(projectRepository.find).toHaveBeenCalledWith();
    });

    it('should return a list of projects', async () => {
      projectRepository.find.mockResolvedValue([
        { ...projectPayload, members: [] },
      ]);
      const project = await projectService.findAll();

      expect(project).toBeInstanceOf(Array);
      expect(project.length).toEqual(1);
    });
  });
  describe('findOne()', () => {
    it('should return a project', async () => {
      userRepository.findOne
        .mockResolvedValueOnce(userPayload)
        .mockResolvedValueOnce(userPayload2);
      projectRepository.findOne.mockResolvedValue({
        ...projectPayload,
        members: [],
      });

      const project = await projectService.findOne(1);

      expect(project.id).toEqual(projectPayload.id);
      expect(project.title).toEqual(projectPayload.title);
      expect(project.dueDate).toEqual(projectPayload.dueDate);
      expect(project.advisor.id).toEqual(userPayload.id);
      expect(project.coAdvisor.id).toEqual(userPayload2.id);
    });
  });
  describe('findProjectsByUserId()', () => {});
  describe('update()', () => {});
  describe('remove()', () => {});
});
