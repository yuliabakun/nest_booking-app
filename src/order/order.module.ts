import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BookableModule } from 'src/bookable/bookable.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), BookableModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
