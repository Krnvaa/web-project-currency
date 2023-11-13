import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { ExchangerService } from '../exchanger/exchanger.service';
import { GiphyService } from '../giphy/giphy.service';
import { Currency } from '../schemas/currency.schemas';
import { CurrencySchema } from '../schemas/currency.schemas';

@Module({
	imports: [MongooseModule.forFeature([{ name: Currency.name, schema: CurrencySchema }])],
	controllers: [CurrencyController],
	providers: [CurrencyService, ExchangerService, GiphyService, Currency, CurrencyModule],
})
export class CurrencyModule { }