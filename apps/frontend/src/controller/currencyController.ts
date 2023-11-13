import axios from 'axios';

// Экспортируем класс ExchangeRateController, который содержит статический метод для получения GIF
export default class ExchangeRateController {
	/**
  	* Статический метод для получения GIF в зависимости от курса валют.
  	* @param {string} baseCurrency - Код базовой валюты.
  	* @param {string} targetCurrency - Код целевой валюты.
  	* @returns {Promise} -  ответ от сервера с GIF.
  	*/
	static async getGiphy(baseCurrency: string, targetCurrency: string) {
		// Выполняем GET-запрос к URL '/currency/getGifByCurrency' с параметрами baseCurrency и targetCurrency
		return await axios.get('/currency/getGifByCurrency', {
			params: { baseCurrency, targetCurrency },
		});
	}
}

