import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Op } from 'sequelize';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async findAll() {
    return this.orderModel.findAll();
  }

  public async findAllOrdersByBookableIdBetweenDates(
    bookableObjectId: string,
    from: Date,
    to: Date,
  ) {
    return this.orderModel.findAll({
      where: {
        bookableObjectId,
        startDate: {
          [Op.between]: [from, to],
        },
        endDate: {
          [Op.gt]: from,
        },
      },
    });
  }

  public async findOne(id: string) {
    return this.orderModel.findOne({ where: { id } });
  }

  async create(order: Partial<Order>) {
    return this.orderModel.create(order);
  }

  async update(id: string, params: Partial<Order>) {
    return this.orderModel.update(params, { where: { id } });
  }

  async delete(id: string) {
    return this.orderModel.destroy({ where: { id } });
  }
}
