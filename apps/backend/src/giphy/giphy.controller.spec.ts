import { Test, TestingModule } from '@nestjs/testing';
import { GiphyController } from './giphy.controller';
import { GiphyService } from './giphy.service';
import { ResponseRandomGiphyDTO } from './dto/response-giphy.dto';


describe('GiphyController', () => {
  let giphyController: GiphyController;
  let giphyService: GiphyService;

  //Используется для создания модуля тестирования и получения экземпляров контроллера и сервиса.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiphyController],
      providers: [GiphyService],
    }).compile(); //Метод compile() компилирует модуль, чтобы он был готов для использования в тестах.

    giphyController = module.get<GiphyController>(GiphyController);
    giphyService = module.get<GiphyService>(GiphyService);
  });
  //Функция describe определяет блок тестов для функции getRandomGiphy контроллера GiphyController
  describe('getRandomGiphy', () => {
    it('should return a random Giphy', async () => {

      const tag = 'test';
      //Объявление константы expectedResult с ожидаемым результатом вызова функции getRandomGiphy. 
      //В данном случае, это объект ResponseRandomGiphyDTO, содержащий URL, идентификатор (ID) и тег.
      const expectedResult: ResponseRandomGiphyDTO = {
        url: 'https://example.com/gif',
        id: 'gif-id',
        tag: tag,
      };
      /**
       * Использование jest.spyOn для замены метода getRandomGiphyByTag сервиса giphyService на заранее определенное значение expectedResult. 
       * Это позволяет имитировать вызов метода и возвращать ожидаемый результат.
       */
      jest.spyOn(giphyService, 'getRandomGiphyByTag').mockResolvedValue(expectedResult);
      const result = await giphyController.getRandomGiphy(tag);
      expect(result).toEqual(expectedResult);
    });
  });
});