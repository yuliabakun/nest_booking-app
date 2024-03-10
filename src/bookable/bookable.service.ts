import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookableObject } from './bookable.model';

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
    return this.bookableModel.create(bookable);
  }

  async update(id: string, params: Partial<BookableObject>) {
    return this.bookableModel.update(params, {
      where: { id },
    });
  }

  async delete(id: string) {
    return this.bookableModel.destroy({ where: { id } });
  }
}
