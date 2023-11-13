import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) класс ResponseExchangerDTO представляет объект ответа от сервиса обмена валют.
 */
export class ResponseExchangerDTO {

  @ApiProperty()
  disclaimer: string;

  @ApiProperty()
  license: string;

  /**
  * Метка времени, когда были получены курсы валют.
  * @type {number}
  */
  @ApiProperty({ description: 'Timestamp of when the exchange rates were retrieved.' })
  timestamp: number;

  /**
   * Код базовой валюты для курсов обмена.
   * @type {string}
   */
  @ApiProperty({ description: 'The base currency code for exchange rates' })
  base: string;

  /**
   * Объект с парами <символ:значение> для курсов обмена относительно запрошенной базовой валюты.
   * @type {Record<string, number>}
   */
  @ApiProperty({ description: 'A rates object with symbol:value pairs, relative to the requested base currency' })
  rates: Record<string, number>;
}