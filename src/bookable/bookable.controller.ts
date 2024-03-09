import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookableService } from './bookable.service';
import { BookableObject } from './bookable.model';
import { CreateBookableDto } from './create-bookable.dto';

@Controller('bookable')
export class BookableController {
  constructor(private bookableService: BookableService) {}

  @Get()
  async getAllBookable() {
    return this.bookableService.findAll();
  }

  @Get(':id')
  async getBookableById(@Param('id') id: string) {
    return this.bookableService.findOne(id);
  }

  @Post()
  async addBookable(@Body() dto: CreateBookableDto) {
    return this.bookableService.create(dto);
  }

  @Patch(':id')
  async updateBookable(
    @Param('id') id: string,
    @Body() fullBody: Partial<BookableObject>,
  ) {
    return this.bookableService.update(id, fullBody);
  }

  @Delete(':id')
  async deleteBookable(@Param('id') id: string) {
    return this.bookableService.delete(id);
  }
}
