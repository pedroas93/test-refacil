import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.create({ data: createBookDto });
    } catch (error) {
      throw new InternalServerErrorException('Error creating book');
    }
  }

  async findAll() {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching books');
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.prisma.book.findUnique({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching book');
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Error updating book');
    }
  }

  async partialUpdate(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Error partially updating book');
    }
  }

  async remove(id: number) {
    try {
      const book = await this.prisma.book.delete({ where: { id } });
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting book');
    }
  }
}
