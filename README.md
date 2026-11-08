# Фотоника без простоев

B2B-сервис подбора проверенных аналогов и поставки научной оптики для лабораторий, НИИ и R&D-подразделений.

## Стек

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query
- **Backend:** Python, FastAPI, SQLAlchemy 2 (async), Alembic, Pydantic v2
- **БД:** PostgreSQL 16
- **Деплой:** Docker Compose (postgres + backend + nginx/frontend)

## Структура

```
backend/    FastAPI-приложение (app/), миграции (alembic/)
frontend/   React SPA (src/), публичный сайт + личный кабинет + админка
```

## Локальный запуск (без Docker)

### Backend

```bash
cd backend
python -m venv .venv
.venv/Scripts/pip install -r requirements-dev.txt   # Windows
cp .env.example .env                                 # настройте DATABASE_URL
.venv/Scripts/alembic upgrade head
.venv/Scripts/uvicorn app.main:app --reload          # http://localhost:8000
```

API-документация: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev                                          # http://127.0.0.1:5175
```

Vite проксирует `/api` на `http://localhost:8000`.

## Запуск через Docker Compose

```bash
docker compose up --build -d
```

Сайт: http://localhost · API: http://localhost:8000/docs

Перед продакшен-деплоем задайте `SECRET_KEY` и `POSTGRES_PASSWORD` в `.env` рядом с `docker-compose.yml`.

## Этапы

1. ✅ Каркас: FastAPI + Postgres + Alembic, Vite + React + Tailwind, Docker Compose
2. Auth: регистрация/вход, JWT, роли (client/engineer/admin), личный кабинет
3. Запросы: форма с вложениями, статусы в кабинете клиента
4. Админка: CRM-воронка, компоненты, поставщики, аналоги
5. Сравнения и КП: PDF-документы, предложения, заказы
6. Полировка: тесты, seed-данные, деплой