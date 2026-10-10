# Requisitos e Instalação
## Python
- Versão necessária: >=3.13,<4.0
- Download: https://www.python.org/downloads/ 

## Pipx
É uma ferramenta feita para instalar e rodar aplicações em Python que vêm de forma de linha de comando(CLI) de maneira isolada.
```bash
pip install pipx
```

## Poetry
O poetry é uma ferramenta moderna de gerenciamento de dependência e empacotamento para projetos em Python. Ele resolve problemas antigos do ecossistema Python(como o uso fragmentado do pip, requirements.txt e ambientes virtuais manuais venv) centralizando tudo em uma única ferramenta.

### Instalar poetry via pipx:
```bash
pipx install poetry
```

# Configuração de Ambiente
## Ativando o Poetry Shell:
Terminal interativo do poetry, com ele não precisamos digitar poetry run ... pra cada comando usado.
    
```bash
poetry self add poetry-plugin-shell
```
## Ativa o ambiente:
```bash
poetry shell
```
### Instalação das dependências
```bash
poetry install
```

## Ferramentas de produtividade:
O projeto utiliza duas ferramentas modernas para garantir a qualidade do código e facilitar a rotina de comandos:

- Ruff: Um linter e formatador de código extremamente rápido, escrito em Rust.
- Taskipy: Um gerenciador de tarefas leve que simplifica a execução de comandos longos no terminal.

## Comandos Úteis(Taskipy & Django):
### Formatação e Qualidade:

- task lint: Procura por erros de sintaxe ou bugs e verifica se a formatação segue o padrão do projeto, sem alterar nenhum arquivo.
- task format: Corrige automaticamente os erros que consegue, organiza os imports e reformata todo o código para deixá-lo limpo e padronizado.

### Banco de Dados(Django ORM)

- task makemigrations: Identifica e mapeia as alterações feitas nos modelos do banco de dados (sem aplicá-las ainda).
- task migrate: Aplica efetivamente as migrações pendentes no banco de dados.

### Execução e Testes

- task dev: Inicia o servidor de desenvolvimento local do Django (localhost).
- task shell: Abre o terminal interativo do Django para testar códigos e consultas diretamente no contexto da aplicação.
- task test: Roda a suíte de testes automatizados usando o Pytest.