import { PartialType } from '@nestjs/mapped-types';
import { CreateBookableDto } from './create-bookable.dto';

export class UpdateBookableDto extends PartialType(CreateBookableDto) {}
