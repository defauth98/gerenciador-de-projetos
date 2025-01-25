import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { config } from 'dotenv';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import { AppModule } from '../app/app.module';
import { dataSource } from '../database/datasource';
import { ProjectEntity } from './entities/project.entity';
import { fakeProject } from './entities/project.factory';

config();
describe('Project Controller', () => {
  let app: INestApplication;
  let projectRepository: Repository<ProjectEntity>;

  beforeAll(async () => {
    await dataSource.initialize().then(async () => {
      await dataSource.synchronize(true);
      await runSeeders(dataSource);
    });
    await dataSource.destroy();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    projectRepository = app.get('PROJECT_REPOSITORY');
    await app.init();
  });

  test(`GET /projects`, async () => {
    await request(app.getHttpServer(), { pfx: 'api' })
      .get('/projects')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeTruthy();

        response.body.forEach((project) => {
          expect(project.id).toBeTruthy();
          expect(project.title).toBeTruthy();
          expect(project.theme).toBeTruthy();
          expect(project.description).toBeTruthy();
          expect(project.advisorId).toBeTruthy();
          expect(project.coAdvisorId).toBeTruthy();
          expect(project.dueDate).toBeTruthy();
          expect(project.status).toBeTruthy();
          expect(project.createdAt).toBeTruthy();
          expect(project.updatedAt).toBeTruthy();
        });
      });
  });

  test('POST /projects', async () => {
    const response = await request(app.getHttpServer(), { pfx: 'api' })
      .post('/projects')
      .send(fakeProject)
      .expect(201);

    const projectId = response.body.id;

    const project = await projectRepository.findOne({
      where: { id: projectId },
    });

    expect(project).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
