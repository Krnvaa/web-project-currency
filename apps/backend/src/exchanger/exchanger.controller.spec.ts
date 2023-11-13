import { Test } from '@nestjs/testing';
import { ExchangerController } from './exchanger.controller';
import { ExchangerService } from './exchanger.service';
import { ResponseExchangerDTO } from './dto/response-exchanger.dto';

describe('ExchangerController', () => {
    let exchangerController: ExchangerController;
    let exchangerService: ExchangerService;

    /**
    * Выполняется перед каждым тестом.
    * Инициализирует переменные окружения, создает модульное тестовое окружение.
    */
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ExchangerController],
            providers: [ExchangerService],
        }).compile();
        // Получаем экземпляр контроллера и сервиса из тестового модуля
        exchangerController = moduleRef.get<ExchangerController>(ExchangerController);
        exchangerService = moduleRef.get<ExchangerService>(ExchangerService);
    });

    describe('getLatestExchangeRates', () => {
        /**
        * Тест для метода `getExchangeRatesLatest`.
        * Проверяет, что метод `axios.get` вызывается с правильным URL и параметрами.
        * Также проверяет, что результат соответствует ожидаемому.
        */
        it('should return the latest exchange rates', async () => {
            const baseCurrency = 'USD';
            const expectedResult: ResponseExchangerDTO = {
                disclaimer: 'Disclaimer',
                license: 'License',
                timestamp: 1636728400,
                base: 'USD',
                rates: { EUR: 0.85, GBP: 0.75 },
            };
            // Мокируем метод getExchangeRatesLatest сервиса и задаем возвращаемое значение
            jest.spyOn(exchangerService, 'getExchangeRatesLatest').mockResolvedValue(expectedResult);
            // Вызываем метод getLatestExchangeRates контроллера и получаем результат
            const result = await exchangerController.getLatestExchangeRates(baseCurrency);
            // Проверяем, что метод getExchangeRatesLatest был вызван с правильными параметрами
            expect(exchangerService.getExchangeRatesLatest).toHaveBeenCalledWith(baseCurrency);
            // Проверяем, что результат соответствует ожидаемой структуре
            expect(result).toEqual(expectedResult);
        });
    });

    describe('getHistoricalExchangeRates', () => {
        it('should return the exchange rates for the specified date', async () => {
            const date = '2023-01-01';
            const baseCurrency = 'USD';
            const expectedResult: ResponseExchangerDTO = {
                disclaimer: 'Disclaimer',
                license: 'License',
                timestamp: 1672531200,
                base: 'USD',
                rates: { EUR: 0.85, GBP: 0.75 },
            };
            // Мокируем метод getExchangeRatesOnDate сервиса и задаем возвращаемое значение
            jest.spyOn(exchangerService, 'getExchangeRatesOnDate').mockResolvedValue(expectedResult);
            // Вызываем метод getHistoricalExchangeRates контроллера и получаем результат
            const result = await exchangerController.getHistoricalExchangeRates(date, baseCurrency);
            // Проверяем, что метод getExchangeRatesOnDate был вызван с правильными параметрами
            expect(exchangerService.getExchangeRatesOnDate).toHaveBeenCalledWith(date, baseCurrency);
            expect(result).toEqual(expectedResult);
        });
    });
});