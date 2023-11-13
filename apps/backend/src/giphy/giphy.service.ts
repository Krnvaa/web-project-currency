import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseRandomGiphyDTO, ResponseRandomGiphyAPI } from './dto/response-giphy.dto';

/**
 * Сервис для взаимодействия с API Giphy.
 */
@Injectable()
export class GiphyService {
  /**
   * Получает случайное GIF-изображение из API Giphy на основе указанного тега. Этот сервис использует библиотеку axios для выполнения 
   * HTTP-запросов.
   * @param key_word - Тег для поиска гифки.
   * @returns Объект с URL, ID и тегом случайной гифки.
   * - `url`: URL случайного GIF.
   * - `id`: Уникальный идентификатор случайного GIF.
   * - `tag`: Тег, использованный для получения GIF.
   * @throws {Error} Выбрасывает ошибку, если возникает проблема с запросом к Giphy API.
   * - Сообщение об ошибке содержит подробности о возникшей проблеме.
   * - В случае ошибки, в консоль записывается 'null', и возвращается значение 'null'.
   */
  async getRandomGiphyByTag(key_word: string): Promise<ResponseRandomGiphyDTO> {
    try {
      //await позволяет ждать завершения асинхронной операции и продолжать выполнение кода только после ее завершения.
      const res = await axios.get<ResponseRandomGiphyAPI>(
        `${process.env.GIPHY_URL}/v1/gifs/random?api_key=${process.env.GIPHY_APP_KEY}&limit=10&tag=${key_word}`,
      );
      // Извлечение соответствующей информации из ответа API
      const randomGif = res.data.data;
      // Формирование и возврат объекта ResponseRandomGiphyDTO
      return { url: randomGif.url, id: randomGif.id, tag: key_word };
    } catch (e) {
      console.error('Error fetching random Giphy:', e);
      console.log("null")
      return null; // Возвращаем null в случае ошибки
    }
  }
}
