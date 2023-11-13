import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
/**
 * Схема Mongoose для модели Currency, которая используется для взаимодействия с базой данных и сохранения информации о валютных обменных курсах.
 */

// Определяем пользовательский тип CurrencyDocument для документов Mongoose
export type CurrencyDocument = HydratedDocument<Currency>;

// Определяем схему Mongoose с использованием декоратора @Schema
@Schema()
export class Currency {

  /**
  * Код базовой валюты.
  * @type {string}
  */
  @Prop()
  @ApiProperty({ description: "Base currency code", nullable: false })
  base: string;

  /**
  * Код целевой валюты.
  * @type {string}
  */
  @Prop()
  @ApiProperty({ description: "Target currency code", nullable: true })
  rate: string;

  /**
  * Значение курса обмена валюты.
  * @type {number}
  */
  @Prop()
  @ApiProperty({ description: "Currency exchange rate value", nullable: true })
  exchangeRate: number;

  /**
   * Дата, когда было получено значение курса обмена валюты.
   * @type {string}
   */
  @Prop()
  @ApiProperty({ description: "Date when the currency exchange rate value was viewed", nullable: true })
  date: string;
}
// Создаем и экспортируем схему Mongoose на основе класса Currency
export const CurrencySchema = SchemaFactory.createForClass(Currency);

