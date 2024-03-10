import { ApiProperty } from '@nestjs/swagger';

export class OrderResponse {
  @ApiProperty({ example: '594c06d4-7f96-4189-b0bf-cf07a7cf02eb' })
  id: string;

  @ApiProperty({ example: 'a0a690b6-2f4b-4c22-b3ea-fe899dc7e12b' })
  bookableObjectId: string;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: '2024-03-12' })
  startDate: string;

  @ApiProperty({ example: '2024-04-13' })
  endDate: string;

  @ApiProperty({ example: '2024-03-10T09:50:30.097Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-10T09:50:30.097Z' })
  updatedAt: string;
}
