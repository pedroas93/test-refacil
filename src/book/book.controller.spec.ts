import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const mockBookService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockBookService }],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      author: 'Author',
      publication: '2024',
    };
    (service.create as jest.Mock).mockResolvedValue(createBookDto);

    const result = await controller.create(createBookDto);
    expect(result).toEqual(createBookDto);
    expect(service.create).toHaveBeenCalledWith(createBookDto);
  });

  it('should return all books', async () => {
    const books = [
      { id: 1, title: 'Test Book', author: 'Author', publication: '2024' },
    ];
    (service.findAll as jest.Mock).mockResolvedValue(books);

    const result = await controller.findAll();
    expect(result).toEqual(books);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a book by id', async () => {
    const book = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      publication: '2024',
    };
    (service.findOne as jest.Mock).mockResolvedValue(book);

    const result = await controller.findOne('1');
    expect(result).toEqual(book);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Book',
      author: 'Author',
      publication: '2024',
    };
    (service.update as jest.Mock).mockResolvedValue(updateBookDto);

    const result = await controller.update('1', updateBookDto);
    expect(result).toEqual(updateBookDto);
    expect(service.update).toHaveBeenCalledWith(1, updateBookDto);
  });

  it('should delete a book', async () => {
    (service.remove as jest.Mock).mockResolvedValue({});

    const result = await controller.remove('1');
    expect(result).toEqual({});
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
