import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) класс CurrencyDto используется для передачи информации о валюте.
 */
export class CurrencyDto {

  /**
   * Код базовой валюты.
   * @type {string}
   */
  @ApiProperty({ description: "Base currency code", nullable: false })
  base: string;

  /**
 * Код целевой валюты.
 * @type {string}
 */
  @ApiProperty({ description: "Target currency code", nullable: true })
  rate: string;

  /**
 * Значение курса обмена валюты.
 * @type {number}
 */
  @ApiProperty({ description: "Currency exchange rate value", nullable: true })
  exchangeRate: number;

  /**
   * Дата, когда было получено значение курса обмена валюты.
   * @type {string}
   */
  @ApiProperty({ description: "Date when the currency exchange rate value was viewed", nullable: true })
  date: string;
}