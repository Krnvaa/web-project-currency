import { Test } from '@nestjs/testing';
import { ExchangerService } from './exchanger.service';
import axios from 'axios';
import { ResponseExchangerDTO } from './dto/response-exchanger.dto';

describe('ExchangerService', () => {
  let exchangerService: ExchangerService;
  let axiosGetSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Устанавливаем переменные окружения для тестов
    process.env.EXCHANGER_APP_ID = 'test-app-id';
    process.env.EXCHANGER_API_URL = 'https://example.com';

    const moduleRef = await Test.createTestingModule({
      providers: [ExchangerService],
    }).compile();

    exchangerService = moduleRef.get<ExchangerService>(ExchangerService);
    axiosGetSpy = jest.spyOn(axios, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getExchangeRatesLatest', () => {
    it('should call axios.get with the correct URL and parameters', async () => {
      const baseCurrency = 'USD';
      const expectedResult: ResponseExchangerDTO = {
        disclaimer: 'Disclaimer',
        license: 'License',
        timestamp: 1636728400,
        base: 'USD',
        rates: { EUR: 0.85, GBP: 0.75 },
      };

      // Мокируем метод axios.get сервиса и задаем возвращаемое значение
      axiosGetSpy.mockResolvedValue({ data: expectedResult });
      // Вызываем метод getExchangeRatesLatest сервиса и получаем результат
      const result = await exchangerService.getExchangeRatesLatest(baseCurrency);
      // Проверяем, что метод axios.get был вызван с правильными параметрами
      expect(axiosGetSpy).toHaveBeenCalledWith('https://example.com/latest.json', {
        params: { app_id: 'test-app-id', base: baseCurrency },
      });
      // Проверяем, что результат соответствует ожидаемой структуре
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getExchangeRatesOnDate', () => {
    it('should call axios.get with the correct URL and parameters', async () => {
      const date = '2023-01-01';
      const baseCurrency = 'USD';
      const expectedResult: ResponseExchangerDTO = {
        disclaimer: 'Disclaimer',
        license: 'License',
        timestamp: 1672531200,
        base: 'USD',
        rates: { EUR: 0.85, GBP: 0.75 },
      };
      // Мокируем метод axios.get сервиса и задаем возвращаемое значение
      axiosGetSpy.mockResolvedValue({ data: expectedResult });
      // Вызываем метод getExchangeRatesOnDate сервиса и получаем результат
      const result = await exchangerService.getExchangeRatesOnDate(date, baseCurrency);
      // Проверяем, что метод axios.get был вызван с правильными параметрами
      expect(axiosGetSpy).toHaveBeenCalledWith('https://example.com/historical/2023-01-01.json', {
        params: { app_id: 'test-app-id', base: baseCurrency },
      });
      // Проверяем, что результат соответствует ожидаемой структуре
      expect(result).toEqual(expectedResult);
    });
  });
});