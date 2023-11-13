import { Module } from '@nestjs/common';
import { ExchangerController } from './exchanger.controller';
import { ExchangerService } from './exchanger.service';

@Module({
	controllers: [ExchangerController],
	providers: [ExchangerService],
})
export class ExchangerModule {}
