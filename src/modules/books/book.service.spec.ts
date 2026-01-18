import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BooksService } from './books.service';
import { BooksRepository } from '../../common/database';
import { Test } from '@nestjs/testing';
import { IBook, IBookCreate, IBookUpdate } from '../../common/interfaces';

describe('BooksService', () => {
  let service: BooksService;
  let repository: DeepMocked<BooksRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BooksRepository, useValue: createMock<BooksRepository>() },
      ],
    }).compile();

    service = module.get(BooksService);
    repository = module.get(BooksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create book', async () => {
      const request = createMock<IBookCreate>();
      const response = createMock<IBook>();

      repository.create.mockResolvedValue(response);

      const result = await service.create(request);

      expect(repository.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const request = createMock<IBookUpdate>();
      const response = createMock<IBook>();

      repository.update.mockResolvedValue(response);

      const result = await service.update('', request);

      expect(repository.update).toHaveBeenCalledWith('', request);
      expect(result).toEqual(response);
    });
  });

  describe('getById', () => {
    it('should be get by id book', async () => {
      const response = createMock<IBook>();

      repository.getById.mockResolvedValue(response);

      const result = await service.getById('');

      expect(repository.getById).toHaveBeenCalledWith('');
      expect(result).toEqual(response);
    });
  });

  describe('getList', () => {
    it('should be get list book', async () => {
      const response = createMock<Array<IBook>>();

      repository.getList.mockResolvedValue(response);

      const result = await service.getList();

      expect(repository.getList).toHaveBeenCalledWith();
      expect(result).toEqual(response);
    });
  });

  describe('deleteById', () => {
    it('should be delete by id book', async () => {
      const response = createMock<IBook>();

      repository.deleteById.mockResolvedValue(response);

      const result = await service.deleteById('');

      expect(repository.deleteById).toHaveBeenCalledWith('');
      expect(result).toEqual(response);
    });
  });
});
