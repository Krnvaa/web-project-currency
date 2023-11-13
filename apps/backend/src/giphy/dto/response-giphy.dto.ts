import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) класс для представления случайного гиф-изображения в ответе.
 */
export class ResponseRandomGiphyDTO {

	@ApiProperty({ description: 'Gif URL' })
	url: string;

	@ApiProperty({ description: 'id Gif URL' })
	id: string;

	@ApiProperty({ description: 'tag Gif' })
	tag: string;

}
/**
 * Класс для представления структуры ответа от Giphy API.
 */
export class ResponseRandomGiphyAPI {

	/**
	 * Объект, содержащий данные случайного Giphy в формате ResponseRandomGiphyDTO.
	 * @type {ResponseRandomGiphyDTO}
	 */
	data: ResponseRandomGiphyDTO;

}