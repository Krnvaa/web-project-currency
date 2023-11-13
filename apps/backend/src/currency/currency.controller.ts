import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from '../schemas/currency.schemas';
import { ApiTags, ApiQuery, ApiResponse, ApiOperation } from '@nestjs/swagger';
/**
 *Контроллер CurrencyController отвечает за обработку HTTP-запросов,связанных с получением GIF в зависимости от 
 обменного курса валют и получением всех записей из базы данных.
 */
@ApiTags('Currency-controller') // Тег для документации Swagger
@Controller('currency') // Базовый путь для всех методов в контроллере
export class CurrencyController {

  /**
   * Конструктор класса CurrencyController.
   * @param currencyService - экземпляр сервиса CurrencyService, используемый для выполнения бизнес-логики, 
   * связанной с получением URL гифки в зависимости от курса валют.
   */
  constructor(private readonly currencyService: CurrencyService) { }

  /**
   * Обработчик HTTP GET-запроса для получения GIF в зависимости от обменного курса указанных валют.
   * @param baseCurrency - Основная валюта, для которой производится расчет обменного курса.
   * @param currencyCode - Код валюты, для которой производится расчет обменного курса.
   * @returns - URL GIF в зависимости от обменного курса.
   */
  @ApiQuery({ name: 'baseCurrency', required: false, type: String }) // Добавляем декоратор для документации параметра запроса 'baseCurrency'
  @ApiQuery({ name: 'currencyCode', required: true, type: String }) // Добавляем декоратор для документации параметра запроса 'currencyCode'
  @ApiResponse({ status: 200, description: 'Success', type: String }) // Добавляем декоратор для успешного ответа
  @ApiOperation({
    summary: 'Get a gif depending on the currency exchange rate',
    description: 'Returns a gif by tag from the Giphy service, depending on the exchange rate received from the Open Exchange Rates service',
  }) // Добавляем декоратор для документации операции
  @Get('getGifByCurrency') // Указываем HTTP-метод (GET) и путь для данного обработчика
  async getGifByCurrency(@Query('baseCurrency') baseCurrency: string, @Query('currencyCode') currencyCode: string): Promise<string> {
    // Вызываем метод getGifURLByCurrency из сервиса CurrencyService и возвращаем результат
    return this.currencyService.getGifURLByCurrency(baseCurrency.toUpperCase(), currencyCode.toUpperCase());
  }

  /**
   * Обработчик HTTP GET-запроса для получения всех записей из базы данных валют.
   * @returns - массив объектов Currency, представляющих все записи в базе данных.
   */
  @Get('allBD') // Указываем HTTP-метод (GET) и путь для данного обработчика
  @ApiResponse({ status: 200, description: 'Success', type: [Currency] }) // Добавляем декоратор для успешного ответа
  @ApiOperation({ summary: 'Returns all records in databases' }) // Добавляем декоратор для документации операции
  async getAllCurrencies(): Promise<Currency[]> {
    // Вызываем метод getAllCurrencies из сервиса CurrencyService и возвращаем результат
    return this.currencyService.getAllCurrencies();
  }
}