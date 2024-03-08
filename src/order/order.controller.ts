import { Controller, Post } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  @Post()
  addOrder(): any {}
}
