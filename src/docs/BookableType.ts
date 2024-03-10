import { ApiProperty } from '@nestjs/swagger';

export class BookableResponse {
  @ApiProperty({ example: '3627ba04-90ea-482c-b46a-ff1b3b2ca688' })
  id: string;

  @ApiProperty({ example: 'Hotel Room' })
  name: string;

  @ApiProperty({ example: 'Twin beds, up to 3 people' })
  description: string;

  @ApiProperty({ example: 5 })
  itemsAvailable: number;

  @ApiProperty({ example: 120 })
  pricePerItem: number;

  @ApiProperty({ example: '2024-03-09T18:58:38.128Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-09T18:58:38.128Z' })
  updatedAt: string;
}
