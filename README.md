# Реализация сервиса, отображающего гифку в зависимости от изменения курса валют
[![Build, Test](https://github.com/Krnvaa/web-project-currency/actions/workflows/nest-app.yml/badge.svg)](https://github.com/Krnvaa/web-project-currency/actions/workflows/nest-app.yml)
[![License: MIT ](https://img.shields.io/badge/License-MIT-fuchsia.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/Krnvaa/web-project-currency.svg?color=salmon)](https://github.com/Krnvaa/web-project-currency/releases)

## Содержание

- [Описание задачи](#Описаниезадачи)

- [Cтек использованных при реализации технологий](#Cтекиспользованныхприреализациитехнологий)

- [Описание реализации](#Описаниереализации)

- [Установка и запуск](#Установкаизапуск)
  
- [Инструкции по использованию](#Инструкциипоиспользованию)

- [Требования](#Требования)


## Описание задачи
Реализовать сервис, который на основании информации, полученной от стороннего сервиса курсов валют будет отображать гифку в зависимости от изменения курса. 

![Анимация](https://github.com/Krnvaa/web-project-currency/blob/dev/gif/gif.gif)

## Стек использованных при реализации технологий
1) NestJS - фреймворк для создания масштабируемых и эффективных серверных приложений на языке TypeScript; 
2) React - фреймворк для создания пользовательских интерфейсов; 
3) MongoDB - NoSQL база данных.

## Описание реализации

### Backend
В рамках серверной части были реализованы 3 модуля для интеграции с внешними сервисами (сервисом гифок giphy.com и сервисом курсов валют openexchangerates.org):
1) модуль giphy, который предназначен для связи с сервисом гифок;
2) модуль exchanger, который предназначен для связи с сервисом курсов валют;
3) модуль, который реализует основую логику отображения гифок.

Основная логика:

• если курс по отношению к базовой валюте за сегодня стал выше вчерашнего, то отображает гифку отсюда https://giphy.com/search/rich;

• если ниже - отсюда https://giphy.com/search/broke;

• если не изменился - отсюда https://i.giphy.com/media/OJac5MRF6xJpqQAcR5/giphy.gif.

### Frontend
Фронтовая часть представляет собой grid с двумя столбцами, где первый это dt (дебит, валюта списания, ИЗ), kt (кредит, валюта зачисления, В).
В качестве наполнения совокупности dt и kt - валютная пара:

USD RUB

USD EUR

USD AZN

USD CNY

При нажатии на строку в гриде двойным кликом - вызывается API реализованный в бэке и в диалоговом окне отображается результирующий GIF.

### Прочее
1) Настроена интеграция с СУБД MongoDB, для этого использовался Docker. Был добавлен файл конфигурации для запуска контейнера docker-compose.yml;
2) Добавлены модульные тесты на контроллеры и сервисы, реализующие интеграцию с внешними сервисами;
3) Создан собственный runner и добавлен файл CI для запуска тестов.

Результ - монорепозиторий с настроенным CI файлом.

## Установка и запуск
1. Клонируйте репозиторий или скачайте исходный код
   ```
   git clone https://github.com/Krnvaa/web-project-currency.git
   ```
2. Установите все зависимости
   ```
   npm install
   ```
3. Для запуска docker выполните
   ```
   docker-compose up
   ```
4. Запустите локальный сервер разработки для вашей бэкенд-части проекта
   ```
   nx serve backend
   ```
5. Запустите react для вашей фронтенд-части проекта
   ```
   nx serve frontend
   ```
6. Для запуска тестов проекта используйте
   ```
   nx test backend
   
## Инструкции по использованию
На главной странице проекта дважды кликните левой кнопкой мыши по любой строке с dt(дебит, валюта списания, ИЗ), kt (кредит, валюта зачисления, В) и просмотрите соответствующую гифку. 

## Требования

- Docker
- NodeJS

