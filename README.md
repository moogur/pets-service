# <p align="center" style="font-size: 30px; font-weight: bold; color: cyan;">Pets service</p>

## Description

Service for storing information about animals (visits to doctors, birthdays, various events, photo gallery, etc.)

Есть 3 режима работы (MODE)

- development
- production
- test

Все файлы с переменными распологаются в `env` директории

В режиме `test` все переменные пробрасываются при запуске команды, в остальных режимах переменные берутся из файлов (необходимо настроить в докере проброс этих файлов в контейнер)

- .service-token.env (значения должны быть заполнены) - только на чтение

```bash
SERVICE_TOKEN=
```

- .sonar.env

```bash
SONAR_TOKEN=
SONAR_SERVER_URL=
```

или можно добавить руками данные переменные

Сервисом отвечающим за авторизацию является - `https://github.com/moogur/authorization-service`
