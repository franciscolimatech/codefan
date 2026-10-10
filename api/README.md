# Python:
    Instalação: https://www.python.org/downloads/ Versões: (">=3.13,<4.0")
# Pipx
    É uma ferramenta feita para instalar e rodar aplicações em Python que vêm de forma de linha de comando(CLI) de maneira isolada.

    ## Instalar poetry via pipx:
    '''
        pipx install poetry
    '''
# O que é o Poetry
    O poetry é uma ferramenta moderna de gerenciamento de dependência e empacotamento para projetos em Python. Ele resolve problemas antigos do ecossistema Python(como o uso fragmentado do pip, requirements.txt e ambientes virtuais manuais venv) centralizando tudo em uma única ferramenta.

    ## Poetry Shell:
        Terminal interativo do poetry, com ele não precisamos digitar poetry run ... pra cada comando usado.
    
        '''
        poetry self add poetry-plugin-shell

        poetry shell
        '''
    ## Instalação das dependências
    '''
        poetry install
    '''

# Ruff e Taskipy:
    O Ruff e o Taskipy são ferramentas modernas usadas para melhorar a produtividade e a qualidade do código em projetos Python. Aqui está a explicação de cada uma delas:

    - O ruff é um linter e formatador de código extremamente rápido, escrito na linguagem Rust.
    - O Taskipy é um gerenciador de tarefas leve e simples para Python.

## Comandos usados nas tarefas(Formatação & Django) via 'poetry shell':
    - task lint: Ele procura por erros de sintaxe/bugs, e verifica se a formatação está dentro do padrão, sem alterar nada no arquivo.
    - task format: Após a varredura do lint, o format corrige os erros que consegue sozinho e organiza os imports, além de reformatar todo o código, deixando mais limpo e padronizado.
    - task dev: Sobe a aplicação Django via localhost.
    - task makemigrations: Verifica as alterações na ORM do banco de dados(sem aplicar).
    - task migrate: Aplica as migrações no banco de dados.
    - task shell: Entra no terminal interativo Django.


