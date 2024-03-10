import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateBookableDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: true, description: 'Must be higher that 0' })
  @IsNotEmpty()
  @IsPositive()
  itemsAvailable: number;

  @ApiProperty({ required: true, description: 'Must be higher that 0' })
  @IsNotEmpty()
  @IsPositive()
  pricePerItem: number;
}
