# HackAlem AI — помощник по лекциям

Веб-прототип превращает расшифровку одной лекции в четыре учебных материала: конспект, основные тезисы, тест с правильными ответами и карточки для повторения.

## Структура

```text
frontend/  Create React App + React + Tailwind CSS v4 + Zustand
backend/   Python + FastAPI, авторизация и API приложения
ml/        изолированный Groq AI pipeline и проверка достоверности
```

Каждая глобальная папка независима. У фронтенда свой `package.json` и `node_modules`, у backend — собственное Python-окружение и `requirements.txt`.

## Что уже работает

- регистрация и вход по email/паролю;
- безопасное хеширование пароля через `scrypt`;
- JWT-сессия и защищённый endpoint профиля;
- маршруты входа, регистрации, новой лекции, обработки, истории, профиля и результатов;
- публичный лендинг с описанием сценария, возможностей и принципа достоверности;
- экраны конспекта и тезисов со ссылками на исходные фрагменты;
- интерактивный тест с объяснениями и переворачиваемые карточки;
- сохранение ответов теста и сложных карточек между устройствами;
- персональный экран «Фокус» с ошибками, сложными темами и индексом усвоения;
- просмотр исходного текста лекции и состояния пустого/короткого ввода;
- адаптивная оболочка на Tailwind CSS v4 с мобильной нижней навигацией;
- микроанимации с поддержкой системной настройки `prefers-reduced-motion`;
- healthcheck и автоматический тест полного auth-сценария.
- SQLite-хранилище пользователей, лекций, материалов и прогресса;
- автоматическая проверка дословной опоры `evidence` в заявленном фрагменте лекции.

Авторизация и хранение работают через FastAPI. Генерацию можно переключать между демонстрационным mock-адаптером и реальным Groq pipeline переменной `REACT_APP_USE_MOCK_API`.

## Модель

Основной провайдер: Groq, модель `openai/gpt-oss-120b` со строгим JSON Schema output. Ключ хранится только в `ml/.env`:

```env
GROQ_API_KEY=your-new-groq-key
GROQ_MODEL=openai/gpt-oss-120b
```

Frontend никогда не получает ключ модели. Цепочка вызова: `frontend → backend → ml → Groq`.

## Запуск ML

```bash
cd ml
cp .env.example .env
# добавьте в .env новый GROQ_API_KEY
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Запуск backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 4000
```

API будет доступен на `http://localhost:4000`, документация FastAPI — на `http://localhost:4000/docs`.

Тестовый аккаунт можно создать повторяемой seed-командой:

```bash
cd backend
source .venv/bin/activate
python -m scripts.seed
```

Данные для входа: `demo@lectora.kz` / `Demo1234!`.

## Запуск frontend

В отдельном терминале:

```bash
cd frontend
npm install
npm start
```

Приложение откроется на `http://localhost:3000`. Команда `npm start` сначала компилирует Tailwind v4, затем запускает CSS watcher и стандартный `react-scripts start` от Create React App. Vite не используется.

## Переменные окружения

Скопируйте `.env.example` в `.env` в корне проекта и замените `JWT_SECRET` перед демонстрацией или публикацией.

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
JWT_SECRET=replace-with-a-long-random-string
JWT_EXPIRES_MINUTES=10080
ML_SERVICE_URL=http://localhost:8001
DATABASE_PATH=backend/data/app.db
```

Для другого адреса API создайте `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_USE_MOCK_API=false
```

## Проверки

```bash
cd backend
source .venv/bin/activate
pytest

cd ../frontend
npm run build

cd ../ml
source .venv/bin/activate
pytest
```

## Перед демонстрацией

1. Проверить выбранную контрольную лекцию и вручную оценить полноту материалов.
2. Запустить полный сценарий на чистом аккаунте: регистрация → генерация → тест → карточки → «Фокус».
3. Подготовить слайд с архитектурой и объяснением проверки `source + evidence`.

## Текущие ограничения

- SQLite рассчитан на прототип и один backend-инстанс; для горизонтального production-развёртывания потребуется PostgreSQL;
- семантическая истинность проверяется привязкой к дословной цитате, но всё равно требует оценки на контрольной лекции;
- распознавание аудио/видео, чат и экспорт относятся к дополнительному объёму после выполнения основного сценария.
