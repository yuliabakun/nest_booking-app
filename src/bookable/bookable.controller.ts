import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BookableService } from './bookable.service';
import { CreateBookableDto } from './create-bookable.dto';
import { UpdateBookableDto } from './update-bookable.dto';
import { BookableExistPipe } from 'src/pipes/bookable-exist.pipe';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyNotEmptyPipe } from 'src/pipes/body-exist.pipe';
import { BookableResponse } from 'src/docs/BookableType';
import { BookableNotFound } from 'src/docs/BookableNotFound';
import { BookableInvalid } from 'src/docs/BookableInvalid';

@ApiTags('Bookable')
@Controller('bookable')
export class BookableController {
  constructor(private readonly bookableService: BookableService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [BookableResponse],
  })
  async getAllBookable() {
    return this.bookableService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success', type: BookableResponse })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: BookableNotFound,
  })
  async getBookableById(@Param('id', BookableExistPipe) id: string) {
    return this.bookableService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created.',
    type: BookableResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: BookableInvalid,
  })
  @ApiBody({ type: CreateBookableDto })
  async addBookable(@Body() body: CreateBookableDto) {
    return this.bookableService.create(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns array with number of updated entities.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: BookableInvalid,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: BookableNotFound,
  })
  @ApiBody({ type: CreateBookableDto })
  async fullUpdateBookable(
    @Param('id', BookableExistPipe) id: string,
    @Body() body: CreateBookableDto,
  ) {
    return this.bookableService.update(id, body);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns array with number of updated entities',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: BookableInvalid,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: BookableNotFound,
  })
  @ApiBody({ type: UpdateBookableDto })
  @UsePipes(BodyNotEmptyPipe)
  async updateBookable(
    @Param('id', BookableExistPipe) id: string,
    @Body() body: UpdateBookableDto,
  ) {
    return this.bookableService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns number of deleted entities.',
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: BookableNotFound,
  })
  async deleteBookable(@Param('id', BookableExistPipe) id: string) {
    return this.bookableService.delete(id);
  }
}
