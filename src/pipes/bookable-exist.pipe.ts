import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { BookableService } from 'src/bookable/bookable.service';

@Injectable()
export class BookableExistPipe implements PipeTransform {
  constructor(private readonly bookableService: BookableService) {}

  async transform(value: any) {
    const id = value;
    const bookable = await this.bookableService.findOne(id);

    if (!bookable) {
      throw new NotFoundException({
        message: `Bookable with ID:${id} is not found.`,
      });
    }

    return value;
  }
}
