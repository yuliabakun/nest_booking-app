import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BookableModule } from 'src/bookable/bookable.module';
import { IsBookableAvailableBetweenDates } from 'src/validation/bookable-available.rule';
import { IsBookableObjectExist } from 'src/validation/bookable-exist.rule';
import { OrderExistPipe } from 'src/pipes/order-exist.pipe';

@Module({
  imports: [SequelizeModule.forFeature([Order]), BookableModule],
  providers: [
    OrderService,
    IsBookableAvailableBetweenDates,
    IsBookableObjectExist,
    OrderExistPipe,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
