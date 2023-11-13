import { Module } from '@nestjs/common';
import { GiphyModule } from './giphy/giphy.module';
import { ConfigModule } from '@nestjs/config';
import { ExchangerModule } from './exchanger/echanger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyModule } from './currency/currency.module';
import { ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../db-connect.config'

@Module({

  imports: [ConfigModule.forRoot(), GiphyModule, ExchangerModule, CurrencyModule, MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getMongoConfig,
  }),
  ],


})
export class AppModule { }