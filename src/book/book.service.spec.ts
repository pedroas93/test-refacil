import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookService', () => {
  let service: BookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      book: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      author: 'Author',
      publication: '2024',
    };
    (prisma.book.create as jest.Mock).mockResolvedValue(createBookDto);

    const result = await service.create(createBookDto);
    expect(result).toEqual(createBookDto);
    expect(prisma.book.create).toHaveBeenCalledWith({ data: createBookDto });
  });

  it('should return all books', async () => {
    const books = [
      { id: 1, title: 'Test Book', author: 'Author', publication: '2024' },
    ];
    (prisma.book.findMany as jest.Mock).mockResolvedValue(books);

    const result = await service.findAll();
    expect(result).toEqual(books);
    expect(prisma.book.findMany).toHaveBeenCalled();
  });

  it('should return a book by id', async () => {
    const book = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      publication: '2024',
    };
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(book);

    const result = await service.findOne(1);
    expect(result).toEqual(book);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Book',
      author: 'Author',
      publication: '2024',
    };
    (prisma.book.update as jest.Mock).mockResolvedValue(updateBookDto);

    const result = await service.update(1, updateBookDto);
    expect(result).toEqual(updateBookDto);
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateBookDto,
    });
  });

  it('should delete a book', async () => {
    (prisma.book.delete as jest.Mock).mockResolvedValue({});

    const result = await service.remove(1);
    expect(result).toEqual({});
    expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
