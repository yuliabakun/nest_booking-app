import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinDate,
} from 'class-validator';
import { IsBookableAvailable } from 'src/validation/bookable-available.rule';
import { IsBookableExist } from 'src/validation/bookable-exist.rule';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Must be valid bookable entity Id',
  })
  @IsNotEmpty()
  @IsString()
  @IsBookableExist()
  bookableObjectId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    required: true,
    description: 'Date is accepted in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  @IsDate({ message: 'Date is accepted in format YYYY-MM-DD' })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsBookableAvailable({ message: 'Overbooked for provided dates' })
  startDate: Date;

  @ApiProperty({
    required: true,
    description: 'Date is accepted in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  @IsDate({ message: 'Date is accepted in format YYYY-MM-DD' })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  endDate: Date;
}
