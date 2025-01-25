import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './app.module';

describe('App Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, async () => {
    await request(app.getHttpServer(), { pfx: 'api' })
      .get('/time')
      .expect(200)
      .then((response) => {
        expect(response.body.time).toBeTruthy();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
