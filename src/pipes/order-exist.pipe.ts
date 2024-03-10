import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderExistPipe implements PipeTransform {
  constructor(private readonly orderService: OrderService) {}

  async transform(value: any) {
    const id = value;
    const order = await this.orderService.findOne(id);

    if (!order) {
      throw new NotFoundException({
        message: `Order with ID: ${id} is not found.`,
      });
    }

    return value;
  }
}
