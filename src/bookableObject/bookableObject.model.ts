import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

@Table
export class BookableObject extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  itemsAvailable: number;

  @Column
  pricePerItem: number;

  @HasMany(() => Order)
  orders: Order[];
}
