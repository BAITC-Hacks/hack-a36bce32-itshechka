# Frontend

Create React App (`react-scripts`) + React + Tailwind CSS v4 + Zustand. Vite не используется.

## Команды

```bash
npm install
npm start
npm run build
```

## Организация `src`

```text
app/       маршрутизация приложения
features/  независимые продуктовые модули и их компоненты
pages/     композиция экранов из feature/shared-компонентов
shared/    переиспользуемые UI-элементы и layout
services/  единственная граница HTTP/API
store/     Zustand-состояние
mocks/     временные данные для проверки UI без AI endpoint
```

Все React-модули используют расширение `.jsx`. Общие элементы (`Button`, `Card`, `FormField`, `PageHeader`) изолированы, поэтому дизайн можно менять точечно.

## Режим API

Авторизация всегда обращается к FastAPI на `REACT_APP_API_URL` (по умолчанию `http://localhost:4000/api`). Генерация учебных материалов временно использует mock-адаптер, чтобы весь пользовательский путь можно было проверить до готовности ML.

Для переключения генерации на backend создайте `.env`:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_USE_MOCK_API=false
```

После этого UI ожидает `POST /api/lectures/:id/process` с тем же контрактом, что находится в `src/mocks/demoData.jsx`.
