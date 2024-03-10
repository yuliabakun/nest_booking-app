import { ApiProperty } from '@nestjs/swagger';

export class OrderInvalid {
  @ApiProperty({
    example: ['quantity must be a positive number'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
