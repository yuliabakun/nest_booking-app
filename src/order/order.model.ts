import { Injectable } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BookableObject } from 'src/bookable/bookable.model';

@Injectable()
@Table
export class Order extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => BookableObject)
  @Column
  bookableObjectId: string;

  @BelongsTo(() => BookableObject)
  bookableObject: BookableObject;

  @Column
  quantity: number;

  @Column
  startDate: Date;

  @Column
  endDate: Date;
}
