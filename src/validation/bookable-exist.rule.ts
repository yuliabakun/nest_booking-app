import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { BookableService } from 'src/bookable/bookable.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookableObjectExist {
  constructor(private readonly bookableService: BookableService) {}

  async validate(bookableId: any) {
    const bookable = await this.bookableService.findOne(bookableId);

    if (!bookable) {
      throw new NotFoundException({
        message: 'Bookable object is not found.',
      });
    }

    return true;
  }
}

export function IsBookableExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBookableObjectExist,
    });
  };
}
