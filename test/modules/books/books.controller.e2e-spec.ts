import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { BooksService } from '../../../src/modules/books/books.service';
import { IBook } from '../../../src/common/interfaces';
import { createMock } from '@golevelup/ts-jest';
import { BooksModule } from '../../../src/modules/books/books.module';
import { DatabaseModule } from '../../../src/common/database';
import { AppModule } from '../../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const booksService = {
    create: jest.fn().mockResolvedValue(createMock<IBook>()),
    update: jest.fn().mockResolvedValue(createMock<IBook>()),
    getById: jest.fn().mockResolvedValue(createMock<IBook>()),
    getList: jest.fn().mockResolvedValue(createMock<Array<IBook>>()),
    deleteById: jest.fn().mockResolvedValue(createMock<IBook>()),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, BooksModule, DatabaseModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/ (POST) books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(201)
      .expect(createMock<IBook>());
  });

  it('/ (PUT) books/:id', () => {
    return request(app.getHttpServer())
      .put('/books')
      .expect(200)
      .expect(createMock<IBook>());
  });

  it('/ (GET) books/:id', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(createMock<IBook>());
  });

  it('/ (GET) books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(createMock<IBook>());
  });

  it('/ (GET) books', () => {
    return request(app.getHttpServer())
      .delete('/books')
      .expect(200)
      .expect(createMock<IBook>());
  });

  afterAll(async () => {
    await app.close();
  });
});
