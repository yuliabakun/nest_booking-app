import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  bookableObjectId: string;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsDate({ message: 'Date is accepted in format YYYY-MM-DD' })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  startDate: Date;

  @IsNotEmpty()
  @IsDate({ message: 'Date is accepted in format YYYY-MM-DD' })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  endDate: Date;
}
