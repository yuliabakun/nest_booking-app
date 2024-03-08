import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order/order.model';
import { BookableObject } from './bookableObject/bookableObject.model';
import { BookableObjectModule } from './bookableObject/bookableObject.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'surus.db.elephantsql.com',
      port: 5432,
      username: 'uytjajmj',
      password: 'P6FrvWStavNgLdgRyUdLIU-JL6ZFmQof',
      database: 'uytjajmj',
      models: [Order, BookableObject],
      autoLoadModels: true,
      synchronize: true,
    }),
    BookableObjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
