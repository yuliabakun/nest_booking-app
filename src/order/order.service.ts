import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { BookableService } from 'src/bookable/bookable.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,

    @Inject(BookableService)
    private readonly bookableService: BookableService,
  ) {}

  async findAll() {
    return this.orderModel.findAll();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }

  async create(order: Partial<Order>) {
    const bookable = await this.bookableService.findOne(order.bookableObjectId);

    if (!bookable) {
      throw new NotFoundException({
        message: 'Bookable Object is not found, check the Id property',
      });
    }

    return this.orderModel.create(order);
  }

  async update(id: string, params: Partial<Order>) {
    const order = await this.orderModel.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException();
    }

    order.set(params);

    await order.save();

    return order;
  }

  async delete(id: string) {
    const numberOfDeletedOrders = await this.orderModel.destroy({
      where: { id },
    });

    if (numberOfDeletedOrders === 0) {
      throw new NotFoundException();
    }

    return { message: 'Order deleted successfully' };
  }
}
