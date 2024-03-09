import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { CreateOrderDto } from './create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async getSingleOrder(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  async addOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() fullBody: Partial<Order>) {
    return this.orderService.update(id, fullBody);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
