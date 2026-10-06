# CodeFan — protótipo

Protótipo navegável criado para explorar a experiência de uma plataforma universitária de aprendizado prático, comunidades técnicas e competições.

## Princípio de produto

> Liberdade para explorar, orientação para não se perder.

Todo desafio continua acessível. No modo **Treinamento**, o CodeFan ajuda o aluno a entender o que o desafio usa, o que ele já praticou e qual o próximo passo (trilhas, "Não sei por onde começar", dicas progressivas e conceitos curtos). Nas **Arenas** nada disso aparece: arena mede desempenho.

## Executar no Windows

No PowerShell, dentro da pasta do projeto:

```powershell
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no terminal.

## Gerar build

```powershell
npm run build
```

## Stack

- Vite
- React
- React Router
- Tailwind CSS
- Lucide React

## Observação

O projeto usa dados fictícios locais (`src/data/mockData.js`) e estado em memória: recarregar a página reinicia a demonstração. Não há backend, autenticação real, executor de código ou sandbox nesta etapa.
