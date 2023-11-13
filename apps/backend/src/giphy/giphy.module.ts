import { Module } from '@nestjs/common';
import { GiphyController } from './giphy.controller';
import { GiphyService } from './giphy.service';
/**
 * Модуль GiphyModule объединяет компоненты для работы с Giphy API.
 */
@Module({
	controllers: [GiphyController], //Свойство controllers определяет массив контроллеров, которые должны быть включены в модуль. 
	providers: [GiphyService], //Свойство providers определяет массив провайдеров, которые будут включены в модуль. 
	//Провайдеры предоставляют зависимости, которые могут быть внедрены в другие классы.
})
export class GiphyModule { }
