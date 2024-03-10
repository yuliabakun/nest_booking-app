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
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';
import { OrderExistPipe } from 'src/pipes/order-exist.pipe';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponse } from 'src/docs/OrderType';
import { OrderNotFound } from 'src/docs/OrderNotFound';
import { OrderInvalid } from 'src/docs/OrderInvalid';
import { BookableNotFound } from 'src/docs/BookableNotFound';
import { BodyNotEmptyPipe } from 'src/pipes/body-exist.pipe';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success', type: [OrderResponse] })
  async getOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success', type: OrderResponse })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: OrderNotFound,
  })
  async getSingleOrder(@Param('id', OrderExistPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created.',
    type: OrderResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: OrderInvalid,
  })
  @ApiResponse({
    status: 404,
    description: 'Validation failure',
    type: BookableNotFound,
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Date is accepted in format YYYY-MM-DD',
  })
  async addOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns array with number of updated entities.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: OrderInvalid,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: OrderNotFound,
  })
  @ApiBody({ type: CreateOrderDto })
  async fullUpdateOrder(
    @Param('id', OrderExistPipe) id: string,
    @Body() fullBody: CreateOrderDto,
  ) {
    return this.orderService.update(id, fullBody);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns array with number of updated entities.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failure',
    type: OrderInvalid,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: OrderNotFound,
  })
  @ApiBody({ type: UpdateOrderDto })
  @UsePipes(BodyNotEmptyPipe)
  async updateOrder(
    @Param('id', OrderExistPipe) id: string,
    @Body() fullBody: UpdateOrderDto,
  ) {
    return this.orderService.update(id, fullBody);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success. Returns number of deleted entities.',
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: OrderNotFound,
  })
  async deleteOrder(@Param('id', OrderExistPipe) id: string) {
    return this.orderService.delete(id);
  }
}
