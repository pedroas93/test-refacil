import { Test, TestingModule } from '@nestjs/testing';
import { BookModule } from './book.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma.service';

describe('BookModule', () => {
  let bookModule: BookModule;
  let bookService: BookService;
  let bookController: BookController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
    }).compile();

    bookModule = module.get<BookModule>(BookModule);
    bookService = module.get<BookService>(BookService);
    bookController = module.get<BookController>(BookController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(bookModule).toBeDefined();
  });

  it('should provide BookService', () => {
    expect(bookService).toBeDefined();
  });

  it('should provide BookController', () => {
    expect(bookController).toBeDefined();
  });

  it('should provide PrismaService', () => {
    expect(prismaService).toBeDefined();
  });
});
