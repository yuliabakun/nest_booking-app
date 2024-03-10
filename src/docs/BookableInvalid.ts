import { ApiProperty } from '@nestjs/swagger';

export class BookableInvalid {
  @ApiProperty({
    example: ['name must be a string', 'description should not be empty'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
