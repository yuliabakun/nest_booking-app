import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookableObject } from './bookable.model';
import { BookableService } from './bookable.service';
import { BookableController } from './bookable.controller';

@Module({
  imports: [SequelizeModule.forFeature([BookableObject])],
  providers: [BookableService],
  controllers: [BookableController],
  exports: [BookableService],
})
export class BookableModule {}
