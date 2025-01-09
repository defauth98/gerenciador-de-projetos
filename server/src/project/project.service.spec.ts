import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { ProjectEntity } from './entities/project.entity';
import { ProjectService } from './project.service';

describe('UserService', () => {
  let projectService: ProjectService;
  let projectRepository: jest.Mocked<Repository<ProjectEntity>>;
  let userRepository: jest.Mocked<Repository<UserEntity>>;

  const projectPayload: ProjectEntity = {
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
    members: [],
  };

  const userPayload: UserEntity = {
    id: 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userPayload2: UserEntity = {
    id: 1,
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
  describe('findProjectsByUserId()', () => {
    it('should call project repository with correct params', async () => {
      const projectSpy = projectRepository.find.mockResolvedValue([
        projectPayload,
      ]);

      await projectService.findProjectsByUserId(1);

      expect(projectSpy).toHaveBeenCalledWith({
        where: {
          members: {
            id: 1,
          },
        },
      });
    });

    it('should return only id and title properties', async () => {
      projectRepository.find.mockResolvedValue([projectPayload]);

      const projects = await projectService.findProjectsByUserId(1);

      const project = projects.values[0];

      expect(project).toEqual({
        id: projectPayload.id,
        title: projectPayload.title,
      });
    });
  });
  describe('update()', () => {});
  describe('remove()', () => {});
});
