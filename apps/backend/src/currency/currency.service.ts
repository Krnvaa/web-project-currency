import { Injectable } from '@nestjs/common';
import { ExchangerService } from '../exchanger/exchanger.service';
import { GiphyService } from '../giphy/giphy.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../schemas/currency.schemas';
import { CurrencyDto } from './currency.dto';

/**
 * Класс CurrencyService, отвечающий за взаимодействие с сервисами ExchangerService, GiphyService и базой данных MongoDB для работы с валютами.
 */
@Injectable()
export class CurrencyService {

  /**
 * Конструктор класса CurrencyService.
 * @param {exchangerService} - Сервис для получения данных об обменных курсах.
 * @param {giphyService} - Сервис для получения URL случайного GIF.
 * @param {currencyModel} - Модель MongoDB для работы с коллекцией Currency.
 */
  constructor(
    private readonly exchangerService: ExchangerService,
    private readonly giphyService: GiphyService,
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>

  ) { }
  /**
  * Возвращает строку с датой предыдущего дня в формате 'YYYY-MM-DD'.
  * currentDate.toISOString().split('T')[0] преобразует текущую дату в строку формата ISO 8601 
  * и затем берет только часть с датой, отбрасывая время и смещение временной зоны, чтобы сохранить только дату.
  */
  private getYesterdayDateString(): string {
    const yesterday = new Date();//Создается объект Date, представляющий текущую дату и время.
    yesterday.setDate(yesterday.getDate() - 1);//Из текущей даты вычитается один день, чтобы получить дату предыдущего дня.
    //Метод toISOString() используется для преобразования объекта Date в строку формата ISO 8601, который выглядит как "YYYY-MM-DDTHH:mm:ss.sssZ"
    //.split('T')[0] используется, чтобы разделить строку и взять только первую часть, содержащую дату
    return yesterday.toISOString().split('T')[0];//Дата преобразуется в строку в формате 'YYYY-MM-DD' и возвращается
  }

  /**
  * Получает URL случайного GIF в зависимости от изменения обменного курса валюты.
  * @param {baseCurrency} - Базовая валюта для получения обменных курсов.
  * @param {currencyCode} - Код валюты, для которой нужно сравнить курс и в зависимости от этого получить GIF.
  * @returns - строка с URL GIF.
  * @public
  */
  async getGifURLByCurrency(baseCurrency: string, currencyCode: string): Promise<string> {

    // Получаем текущий обменный курс базовой валюты
    const todayRates = await this.exchangerService.getExchangeRatesLatest(baseCurrency);
    // Получаем обменный курс базовой валюты на предыдущий день
    const yesterdayRates = await this.exchangerService.getExchangeRatesOnDate(this.getYesterdayDateString(), baseCurrency);

    // Получаем текущий обменный курс сравниваемой валюты
    const todayRate = todayRates.rates[currencyCode];
    // Получаем обменный курс сравниваемой валюты на предыдущий день
    const yesterdayRate = yesterdayRates.rates[currencyCode];
    // Получаем результат от сервиса Giphy в зависимости от изменения курса валюты
    const giphyResult = await this.giphyService.getRandomGiphyByTag(
      todayRate > yesterdayRate ? 'rich' : todayRate < yesterdayRate ? 'broke' : 'default'
    );

    // Сохраняем данные о валюте в базе данных
    this.saveCurrency(
      `${baseCurrency}`,
      `${currencyCode}`,
      todayRate,
      new Date().toISOString().split('T')[0]);

    // Возвращаем URL GIF в зависимости от тега
    if (giphyResult.tag == 'default') {
      return 'https://i.giphy.com/media/OJac5MRF6xJpqQAcR5/giphy.gif';

    } else {
      console.log(giphyResult.url)
      return "https://i.giphy.com/media/" + giphyResult.id + "/giphy.gif";
    }
  }
  /**
   * Сохраняет данные о валюте в базе данных.
   * @param base - Базовая валюта.
   * @param rate - Код валюты.
   * @param exchangeRate - Сравниваемая.
   * @param date - Дата сохранения данных.
   * @returns - сохраненный объект Currency.
   */
  async saveCurrency(base, rate, exchangeRate, date) {
    // Создаем DTO для сохранения данных о валюте
    const createCurrencyDto = new CurrencyDto();
    createCurrencyDto.base = base;
    createCurrencyDto.rate = rate;
    createCurrencyDto.exchangeRate = exchangeRate;
    createCurrencyDto.date = date;
    // Создаем объект Currency с использованием DTO
    const currency = new this.currencyModel(createCurrencyDto);
    // Сохраняем в базу данных и возвращаем результат
    return currency.save();
  }
  /**
   * Получает все сохраненные объекты Currency из базы данных.
   * @returns - массив объектов Currency.
   */
  async getAllCurrencies(): Promise<Currency[]> {
    try {
      // Извлекаем все объекты Currency из базы данных и возвращаем результат
      const currencies = await this.currencyModel.find().exec();
      return currencies;
    } catch (error) {
      // В случае ошибки выбрасываем исключение
      throw new Error(`Ошибка при получении всех валют: ${error}`);
    }
  }
}