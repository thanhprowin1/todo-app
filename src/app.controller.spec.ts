import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppModule],
      providers: [AppService],
    }).compile();

    appController = app.get<AppModule>(AppModule);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      
    });
  });
});
