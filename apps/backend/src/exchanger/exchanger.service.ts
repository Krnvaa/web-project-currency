import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseExchangerDTO } from './dto/response-exchanger.dto';

/**
 * Сервис ExchangerService предоставляет методы для получения информации о курсах валют от сервиса обмена валют.
 */
@Injectable()
export class ExchangerService {
  private readonly appId: string;
  private readonly baseUrl: string;

  /**
   * Конструктор класса ExchangerService.
   * Инициализирует приватные свойства идентификатора и базового URL API из переменных окружения.
   */
  constructor() {
    this.appId = process.env.EXCHANGER_APP_ID; // Получаем идентификатор из переменных окружения
    this.baseUrl = process.env.EXCHANGER_API_URL; // Получаем базовый URL API из переменных окружения
  }

  /**
  * Метод для получения последних курсов обмена валюты относительно указанной базовой валюты.
  * @param {string} baseCurrency - Базовая валюта, относительно которой запрашиваются курсы обмена.
  * @returns {Promise<ResponseExchangerDTO>} - объект ResponseExchangerDTO с инфорамцией о курсах обмена.
  */
  async getExchangeRatesLatest(baseCurrency: string): Promise<ResponseExchangerDTO> {
    // Выполняем GET-запрос к API для получения последних курсов обмена валюты
    const response = await axios.get<ResponseExchangerDTO>(`${this.baseUrl}/latest.json`, {
      params: { app_id: this.appId, base: baseCurrency },
    });
    // Возвращаем данные ответа
    return response.data;
  }

  /**
   * Метод для получения курсов обмена валюты на указанную дату относительно базовой валюты.
   * @param {string} date - Дата, для которой запрашиваются курсы обмена валюты (в формате "YYYY-MM-DD").
   * @param {string} baseCurrency - Базовая валюта, относительно которой запрашиваются курсы обмена.
   * @returns {Promise<ResponseExchangerDTO>} объект ResponseExchangerDTO с информацией о курсах обмена.
   */
  async getExchangeRatesOnDate(date: string, baseCurrency: string): Promise<ResponseExchangerDTO> {
    const response = await axios.get<ResponseExchangerDTO>(`${this.baseUrl}/historical/${date}.json`, {
      params: { app_id: this.appId, base: baseCurrency },
    });
    return response.data;
  }
}