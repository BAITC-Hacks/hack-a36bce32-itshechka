# ML service

Отдельный FastAPI-сервис для обработки лекций через Groq. Использует `openai/gpt-oss-120b` и строгий JSON Schema output.

## Запуск

```bash
cp .env.example .env
# добавьте новый GROQ_API_KEY в .env
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Сервис предоставляет `POST /generate` и `GET /health`. Текст делится на пронумерованные фрагменты, а конспект и тезисы возвращают ссылки на эти фрагменты.
