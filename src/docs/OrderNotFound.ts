import { ApiProperty } from '@nestjs/swagger';

export class OrderNotFound {
  @ApiProperty({ example: 'Order with ID: ${id} is not found.' })
  message: string;
}
