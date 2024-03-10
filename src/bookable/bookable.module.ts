import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookableObject } from './bookable.model';
import { BookableService } from './bookable.service';
import { BookableController } from './bookable.controller';
import { BookableExistPipe } from 'src/pipes/bookable-exist.pipe';
import { BodyNotEmptyPipe } from 'src/pipes/body-exist.pipe';

@Module({
  imports: [SequelizeModule.forFeature([BookableObject])],
  providers: [BookableService, BookableExistPipe, BodyNotEmptyPipe],
  controllers: [BookableController],
  exports: [BookableService],
})
export class BookableModule {}
