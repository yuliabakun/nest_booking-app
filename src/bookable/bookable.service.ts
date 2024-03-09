import { Injectable } from '@nestjs/common';
import { BookableObject } from './bookable.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookableService {
  constructor(
    @InjectModel(BookableObject)
    private bookableModel: typeof BookableObject,
  ) {}

  async findAll() {
    return this.bookableModel.findAll();
  }

  public async findOne(id: string) {
    return this.bookableModel.findOne({ where: { id } });
  }

  async create(bookable: Partial<BookableObject>) {
    const objectCreated = await this.bookableModel.create(bookable);

    return objectCreated;
  }

  async update(id: string, params: Partial<BookableObject>) {
    const updatedObject = await this.bookableModel.update(params, {
      where: { id },
    });

    return updatedObject;
  }

  async delete(id: string) {
    return this.bookableModel.destroy({ where: { id } });
  }
}
