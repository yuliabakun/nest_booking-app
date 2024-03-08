import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookableObject } from './bookableObject.model';
import { BookableObjectService } from './bookableObject.service';
import { BookableObjectController } from './bookableObject.controller';

@Module({
  imports: [SequelizeModule.forFeature([BookableObject])],
  providers: [BookableObjectService],
  controllers: [BookableObjectController],
})
export class BookableObjectModule {}
