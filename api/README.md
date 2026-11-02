# CodeFan — API

Estrutura inicial Django com Django REST Framework e PostgreSQL. Atualmente apenas `admin/` está registrada; ainda não há endpoints de domínio ou integração com o frontend. Consulte a [arquitetura](../docs/ARQUITETURA.md).

## Requisitos

- Python 3.13 (o manifesto aceita `>=3.13,<4.0`; Docker e CI usam 3.13).
- Poetry 2.5.1 para reproduzir a versão do Docker e do CI.
- PostgreSQL 16, disponível pelo Compose, ou instância local compatível.
- Docker com Compose para o caminho em contêineres.

Para instalar Poetry com pipx, caso essas ferramentas ainda não estejam disponíveis:

```bash
python3 -m pip install --user pipx
python3 -m pipx ensurepath
pipx install poetry==2.5.1
```

Após atualizar o PATH, abra outro terminal se necessário. Os comandos abaixo usam `poetry run`; não é necessário instalar o plugin `poetry shell`.

## Variáveis de ambiente

Na raiz do repositório, crie `.env` a partir de `.env.example` **somente se ainda não existir**, e preencha os valores para seu ambiente local:

```bash
cp -n .env.example .env
```

| Variável | Uso |
| --- | --- |
| `SECRET_KEY` | Chave do Django; gere um valor próprio e não o versione. |
| `DEBUG` | Apenas o texto `True` ativa debug; use `False` fora do desenvolvimento. |
| `DJANGO_ALLOWED_HOSTS` | Hosts separados por vírgula; padrão `localhost,127.0.0.1`. |
| `POSTGRES_USER` | Usuário do banco. |
| `POSTGRES_PASSWORD` | Senha do banco local. |
| `POSTGRES_DB` | Nome do banco. |
| `POSTGRES_PORT` | Porta publicada do PostgreSQL no host, por exemplo `5432`. |
| `POSTGRES_HOST` | Para API executada no host, adicione `127.0.0.1` ao `.env`; esta chave não está no exemplo atual. |

O Django lê `api/.env` e depois `.env` da raiz, sem sobrescrever variáveis já definidas. Prefira um único arquivo na raiz para evitar configurações divergentes. No contêiner, o Compose define `POSTGRES_HOST=database` e `POSTGRES_PORT=5432`, independentemente da porta publicada no host.

## Executar API e banco com Docker

A partir da raiz, após configurar `.env`:

```bash
docker compose up -d --build
docker compose exec api python manage.py migrate
docker compose exec api python manage.py createsuperuser
```

A API fica em `http://localhost:8000` e o admin em `http://localhost:8000/admin/`. A raiz `/` não possui uma view e pode responder 404. A imagem usa Gunicorn e não inclui ferramentas do grupo de desenvolvimento; execute lint e Pytest pelo ambiente Poetry local.

```bash
docker compose logs -f api
docker compose down
```

O banco permanece no volume `codefan_postgres_data` gerenciado pelo Compose. Não use `down -v` se quiser preservar os dados. Migrações e criação de superusuário são etapas explícitas; o startup não as executa. O frontend é iniciado separadamente conforme o [guia web](../web/README.md).

O Compose não configura entrega de arquivos estáticos do admin para produção. O uso de Gunicorn, por si só, não torna esta configuração uma implantação de produção completa.

## Executar a API localmente

Configure `POSTGRES_HOST=127.0.0.1` e a porta publicada no `.env` da raiz. Inicie apenas o banco pelo Compose, evitando disputar a porta 8000 com o contêiner da API:

```bash
docker compose up -d database
cd api
poetry install --no-root
poetry run python manage.py migrate
poetry run python manage.py createsuperuser
poetry run task dev
```

Se a API em Docker já estiver ativa, pare-a com `docker compose stop api` na raiz antes de iniciar o servidor local.

## Comandos e verificações

Execute dentro de `api/` com o ambiente configurado:

| Comando | Finalidade |
| --- | --- |
| `poetry run task lint` | Ruff e verificação de formatação, sem alterar arquivos. |
| `poetry run task format` | Corrigir lint e formatar; altera arquivos. |
| `poetry run task makemigrations` | Gerar migrações das alterações de modelos. |
| `poetry run task migrate` | Aplicar migrações. |
| `poetry run task dev` | Servidor Django de desenvolvimento. |
| `poetry run task shell` | Shell do Django. |
| `poetry run task test` | Executar Pytest. |
| `poetry run python manage.py check` | Verificar configuração do Django. |

Para reproduzir as verificações locais do CI:

```bash
poetry run task lint
poetry run python manage.py check
poetry run pytest -q
```

A suíte atual contém um smoke test da página de login do admin; ela não valida funcionalidades de produto ainda não implementadas. Testes futuros que acessarem banco precisam de uma instância de desenvolvimento/teste e das permissões necessárias para criar o banco de testes.

Para verificar o build da imagem, a partir da raiz:

```bash
docker build --tag codefan-api:local ./api
```

Voltar ao [README principal](../README.md) · [Contribuir](../docs/CONTRIBUINDO.md).
