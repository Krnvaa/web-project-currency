import { Test } from '@nestjs/testing';
import axios from 'axios';
import { GiphyService } from './giphy.service';

/**Мокирование модуля axios. Это позволяет замокать вызовы методов axios.get и других методов axios, чтобы их поведение можно было 
контролировать в тестах
*/
jest.mock('axios');


describe('GiphyService', () => {
  let giphyService: GiphyService;

  /**Функция beforeEach выполняется перед каждым тестом в блоке describe. 
   * В данном случае, она используется для создания модуля тестирования и получения экземпляра GiphyService. 
   */
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GiphyService],
    }).compile();

    // Получаем экземпляр GiphyService из тестового модуля
    giphyService = moduleRef.get<GiphyService>(GiphyService);
  });

  //Функция afterEach выполняется после каждого теста в блоке describe.
  afterEach(() => {
    // Очищаем все моки
    jest.clearAllMocks();
  });

  //тест проверяет, что функция getRandomGiphyByTag возвращает случайный GIF, тест выполняется асинхронно и ожидается, что результат будет соответствовать ожидаемой структуре.
  it('should return a random Giphy', async () => {
    const keyWord = 'test';
    // Определяем моковый ответ от API Giphy
    const mockResponse = {
      data: {
        data: {
          url: 'https://example.com/gif',
          id: 'gif-id',
        },
      },
    };
    /**
     * Мокирование вызова метода axios.get и задание возвращаемого значения. 
     * В данном случае, метод axios.get заменяется на мок-функцию, которая всегда возвращает mockResponse.
     */
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);
    const result = await giphyService.getRandomGiphyByTag(keyWord);
    //Формирование URL для запроса к API Giphy на основе конфигурационных переменных окружения GIPHY_URL и GIPHY_APP_KEY, а также значения keyWord.
    const url = `${process.env.GIPHY_URL}/v1/gifs/random?api_key=${process.env.GIPHY_APP_KEY}&limit=10&tag=${keyWord}`;
    // Проверка, что метод axios.get был вызван с ожидаемым URL и параметрами.
    expect(axios.get).toHaveBeenCalledWith(
      url,
    );
    //Проверка, что результат вызова getRandomGiphyByTag соответствует ожидаемой структуре. 
    //Результат должен содержать URL, ID и ключевое слово.
    expect(result).toEqual({
      url: 'https://example.com/gif',
      id: 'gif-id',
      tag: keyWord,
    });
  });

  //тест проверяет, что функция getRandomGiphyByTag возвращает null, если происходит ошибка.
  it('should return null if an error occurs', async () => {
    const keyWord = 'test';
    const url = `${process.env.GIPHY_URL}/v1/gifs/random?api_key=${process.env.GIPHY_APP_KEY}&limit=10&tag=${keyWord}`;

    /**
     * Мокирование вызова метода axios.get и выброс ошибки. 
     * В данном случае, метод axios.get заменяется на мок-функцию, которая всегда выбрасывает ошибку с сообщением 'Test error'.
     */
    (axios.get as jest.Mock).mockRejectedValue(new Error('Test error'));

    const result = await giphyService.getRandomGiphyByTag(keyWord);
    // Проверяем, что axios.get был вызван с правильным URL и параметрами
    expect(axios.get).toHaveBeenCalledWith(
      url,
    );
    // Проверка, что результат вызова getRandomGiphyByTag равен null, как ожидается при возникновении ошибки.
    expect(result).toBeNull();
  });
});