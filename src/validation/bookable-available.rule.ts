import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { BookableService } from 'src/bookable/bookable.service';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/order.model';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookableAvailableBetweenDates {
  constructor(
    private readonly bookableService: BookableService,
    private readonly orderService: OrderService,
  ) {}

  async validate(_date: Date, args: ValidationArguments) {
    const order: Partial<Order> = args.object;
    const bookable = await this.bookableService.findOne(order.bookableObjectId);

    if (order.quantity > bookable.itemsAvailable) {
      return false;
    }

    const ordersPlaced =
      await this.orderService.findAllOrdersByBookableIdBetweenDates(
        order.bookableObjectId,
        order.startDate,
        order.endDate,
      );

    if (ordersPlaced.length > 0) {
      const totalObjectsBooked = ordersPlaced.reduce((acc, curr) => {
        acc += curr.quantity;

        return acc;
      }, 0);

      const availableItems = bookable.itemsAvailable - totalObjectsBooked;

      if (order.quantity > availableItems) {
        return false;
      }
    }

    return true;
  }
}

export function IsBookableAvailable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBookableAvailableBetweenDates,
    });
  };
}
