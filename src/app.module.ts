import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order/order.model';
import { OrderModule } from './order/order.module';
import { BookableObject } from './bookable/bookable.model';
import { BookableModule } from './bookable/bookable.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppLoggerMiddleware } from './middlewares/logging';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_USER,
      models: [Order, BookableObject],
      autoLoadModels: true,
      synchronize: true,
    }),
    BookableModule,
    OrderModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
