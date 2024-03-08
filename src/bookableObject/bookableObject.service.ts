import { Injectable } from '@nestjs/common';
import { BookableObject } from './bookableObject.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookableObjectService {
  constructor(
    @InjectModel(BookableObject)
    private bookableObjectModel: typeof BookableObject,
  ) {}

  async findAll() {
    return this.bookableObjectModel.findAll();
  }

  async findOne(id: string) {
    return this.bookableObjectModel.findOne({ where: { id } });
  }

  async create(
    name: string,
    description: string,
    itemsAvailable: number,
    pricePerItem: number,
  ) {
    const objectCreated = await this.bookableObjectModel.create({
      name,
      description,
      itemsAvailable,
      pricePerItem,
    });

    return objectCreated;
  }

  async update(id: string, params: Partial<BookableObject>) {
    const updatedObject = await this.bookableObjectModel.update(params, {
      where: { id },
    });

    return updatedObject;
  }
}
