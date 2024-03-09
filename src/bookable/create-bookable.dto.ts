import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateBookableDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  itemsAvailable: number;

  @IsNotEmpty()
  @IsPositive()
  pricePerItem: number;
}
