FROM python:3.13-slim AS builder

ENV POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN pip install --no-cache-dir poetry==2.5.1

COPY pyproject.toml poetry.lock ./

RUN poetry install --only main --no-root --no-ansi \
    && rm -rf "$POETRY_CACHE_DIR"


FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

RUN useradd --system --uid 10001 --create-home appuser

COPY --from=builder /app/.venv /app/.venv

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--access-logfile", "-"]
