import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('book')
@ApiTags('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Book' })
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all task' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({ status: 200, description: 'Return task by Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit book partially' })
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(+id, updateBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit book' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book' })
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(+id);
  }
}
