import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { BooksService } from './books.service';
import { IBook } from '../../common/interfaces';
import { createMock } from '@golevelup/ts-jest';
import { BooksModule } from './books.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const booksService = {
    create: jest.fn().mockRejectedValue(createMock<IBook>()),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/ (POST) books', () => {
    return request(app.getHttpServer())
      .post('/')
      .expect(201)
      .expect(createMock<IBook>());
  });
});
