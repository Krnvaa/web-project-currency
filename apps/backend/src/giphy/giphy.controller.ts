import { Controller, Get, Query } from '@nestjs/common';
import { GiphyService } from './giphy.service';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { ResponseRandomGiphyDTO } from './dto/response-giphy.dto';

/**
 * Контроллер GiphyController обрабатывает HTTP-запросы, связанные с сервисом Giphy.
 */
@ApiTags('Giphy') // Тег для документации Swagger
@Controller('giphy') // Базовый путь для всех методов в контроллере
export class GiphyController {

  /**
   * Конструктор класса GiphyController.
   * @param giphyService -  Экземпляр GiphyService, используемый для выполнения запросов к Giphy API.
   */
  constructor(private readonly giphyService: GiphyService) { }

  /**
   * Обработчик HTTP GET-запроса для получения случайного GIF по указанному тегу.
   * @param tag - Тег, по которому будет производиться поиск случайного GIF.
   * @returns Объект ResponseRandomGiphyDTO, описывающий случайную гифку,которая соответсвует указанному тегу.
   * @public
   */
  @ApiQuery({ name: 'tag', type: String }) //Декоратор для документации параметра запроса 'tag'
  @ApiResponse({ status: 200, description: 'Success', type: ResponseRandomGiphyDTO, isArray: true }) //Декоратор для успешного ответа
  @ApiResponse({ status: 404, description: 'Not Found' }) //Декоратор для ответа в случае отсутствия результата
  @ApiOperation({ summary: 'Get a gif by tag', description: 'Returns a random gif by tag from the Giphy service' }) //Декоратор для документации операции
  @Get('getGiphyRandom') //HTTP-метод (GET) и путь для данного обработчика
  async getRandomGiphy(@Query('tag') tag: string): Promise<any> {
    // Вызываем метод getRandomGiphyByTag из сервиса GiphyService и возвращаем результат
    return this.giphyService.getRandomGiphyByTag(tag);
  }
}