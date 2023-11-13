import { Controller, Get, Query, Param } from '@nestjs/common';
import { ExchangerService } from './exchanger.service';
import { ResponseExchangerDTO } from './dto/response-exchanger.dto';
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';

/**
 * Контроллер ExchangerController обрабатывает HTTP-запросы, связанные с обменным курсом валют.
 */
@ApiTags('Exchanger') // Тег для документации Swagger
@Controller('exchanger') // Базовый путь для всех методов в контроллере
export class ExchangerController {

  /**
   * Конструктор класса ExchangerController.
   * @param exchangerService - Экземпляр ExchangerService, используемый для выполнения запросов к API обменного курса валют.
   */
  constructor(
    private readonly exchangerService: ExchangerService
  ) { }

  /**
   * Обработчик HTTP GET-запроса для получения последних курсов обмена валюты относительно указанной базовой валюты.
   * @param {baseCurrency} - Базовая валюта, относительно которой запрашиваются курсы обмена.
   * @returns - объект ResponseExchangerDTO с данными о курсах обмена.
   */
  @Get('latest') // HTTP-метод (GET) и путь для данного обработчика
  @ApiResponse({ status: 200, description: 'Success', type: ResponseExchangerDTO }) // Декоратор для успешного ответа
  @ApiOperation({ summary: 'Get the latest exchange rates', description: 'Returns the latest exchange rates for currencies.' }) // Декоратор для документации операции
  async getLatestExchangeRates(@Query('baseCurrency') baseCurrency: string): Promise<ResponseExchangerDTO> {
    // Вызываем метод getExchangeRatesLatest из сервиса ExchangerService и возвращаем результат
    return this.exchangerService.getExchangeRatesLatest(baseCurrency);
  }

  /**
   * Обработчик HTTP GET-запроса для получения курсов обмена валюты на указанную дату относительно базовой валюты.
   * @param {date} - Дата, для которой запрашиваются курсы обмена валюты (в формате "YYYY-MM-DD").
   * @param {baseCurrency} - Базовая валюта, относительно которой запрашиваются курсы обмена.
   * @returns - объект ResponseExchangerDTO с данными о курсах обмена.
   */
  @Get('historical/:date') //HTTP-метод (GET) и динамический параметр в пути
  @ApiParam({ name: 'date', required: true, description: 'Date in YYYY-MM-DD format' }) // Декоратор для документации параметра запроса 'date'
  @ApiResponse({ status: 200, description: 'Success', type: ResponseExchangerDTO }) // Декоратор для успешного ответа
  @ApiOperation({ summary: 'Getting exchange rates on the specified date', description: 'Returns the exchange rates of currencies for the specified date.' }) // Декоратор для документации операции
  async getHistoricalExchangeRates(@Param('date') date: string, @Query('baseCurrency') baseCurrency: string): Promise<ResponseExchangerDTO> {
    // Вызываем метод getExchangeRatesOnDate из сервиса ExchangerService и возвращаем результат
    return this.exchangerService.getExchangeRatesOnDate(date, baseCurrency);
  }
}