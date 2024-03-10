import { ApiProperty } from '@nestjs/swagger';

export class BookableNotFound {
  @ApiProperty({ example: 'Bookable with ID: ${id} is not found.' })
  message: string;
}
