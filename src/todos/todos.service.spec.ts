import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { SqliteService } from '../database/sqlite.service';

describe('TodosService', () => {
  let service: TodosService;

  const mockSqliteService = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: SqliteService,
          useValue: mockSqliteService,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
