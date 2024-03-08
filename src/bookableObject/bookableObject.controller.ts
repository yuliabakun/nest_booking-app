import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookableObjectService } from './bookableObject.service';
import { BookableObject } from './bookableObject.model';

@Controller('bookable')
export class BookableObjectController {
  constructor(private readonly bookableService: BookableObjectService) {}

  @Get()
  async getAllBookableObjects() {
    return this.bookableService.findAll();
  }

  @Get(':id')
  async getBookableObjectById(@Param('id') id: string) {
    return this.bookableService.findOne(id);
  }

  @Post()
  async addBookableObject(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('itemsAvailable') itemsAvailable: number,
    @Body('pricePerItem') pricePerItem: number,
  ) {
    const generatedObject = await this.bookableService.create(
      name,
      description,
      itemsAvailable,
      pricePerItem,
    );

    return { generatedObject };
  }

  @Patch(':id')
  async updateBookableObject(
    @Param('id') id: string,
    @Body() fullBody: Partial<BookableObject>,
  ) {
    const updatedObject = await this.bookableService.update(id, fullBody);

    return { updatedObject };
  }
}
