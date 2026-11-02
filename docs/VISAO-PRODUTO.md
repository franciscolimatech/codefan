# Visão do produto

O **CodeFan** é uma plataforma voltada inicialmente aos alunos da **UNIFAN**, que reúne aprendizado prático de programação e Engenharia de Software, comunidades técnicas, gamificação e competição.

O aluno pode explorar desafios livremente, participar de comunidades, seguir trilhas, ganhar XP e competir em Arenas. Quando trava, a proposta é ajudá-lo a reconhecer conhecimentos que precisa reforçar, oferecer dicas progressivas e encaminhá-lo a um conceito curto antes de retornar ao problema.

Esta é a visão do produto. O [estado da implementação](INTEGRACAO-MVP.md) e o [escopo em discussão](ESCOPO_MVP.md) distinguem essa visão do protótipo disponível.

## Pessoas e responsabilidades

| Perfil | Responsabilidade prevista |
| --- | --- |
| Aluno | Explorar, praticar, participar de comunidades e Arenas e acompanhar a evolução. |
| Professor | Criar desafios, comunidades e Arenas e acompanhar dificuldades e aprendizagem dos alunos autorizados. |
| Coordenador | Acompanhar dificuldades recorrentes e indicadores acadêmicos dentro de seu acesso autorizado. |
| Superadmin | Administrar contas, permissões, moderação, configurações e infraestrutura. |

Papéis de comunidade — responsável, moderador e membro — são distintos dos perfis da plataforma. A matriz detalhada de permissões ainda precisa ser implementada. Administração não substitui as funções pedagógicas de professores ou coordenadores.

## Experiência de aprendizagem

1. O aluno explora um desafio ou segue uma trilha de conhecimento.
2. Consulta o enunciado e tenta resolver o problema.
3. Se precisar, pede orientação e recebe pré-requisitos e dicas progressivas.
4. Pode estudar um conceito curto e praticá-lo antes de voltar ao desafio, preservando seu rascunho.
5. Acompanha feedback, evidências por habilidade e evolução ao longo do tempo.

O nivelamento é uma forma de orientação já demonstrada no protótipo; não deve ser confundido com uma exigência de bloquear a exploração livre. Curso, semestre ou comunidade não restringem por si só quais desafios o aluno pode explorar. Regras de audiência, privacidade e embargo de conteúdo continuam sendo responsabilidades próprias.

## Princípios do domínio

- **RA identifica o vínculo institucional; não é credencial de acesso.** O próprio usuário cria e ativa suas credenciais. A validação do vínculo ainda depende de integração ou processo a definir.
- **Comunidade não significa apenas turma.** Pode representar disciplina, grupo de estudos ou tema técnico.
- **Versões publicadas de desafios são preservadas.** Uma alteração gera nova versão; uma submissão deve apontar para a versão correta.
- **XP, score e desempenho são diferentes.** XP representa progressão e engajamento; score expressa pontuação da Arena; desempenho reúne evidências como acertos, erros, tempo e categorias.
- **Arena online e Arena verificada compartilham o sistema.** A verificada adiciona identificação, supervisão presencial e maior confiabilidade do resultado oficial.
- **O código do participante nunca controla o próprio veredito.** Falhas de infraestrutura não devem ser contabilizadas como erros do participante.
- **Pedir ajuda faz parte do aprendizado.** Evidências assistidas e independentes devem ser distinguíveis; um acerto isolado não comprova domínio consistente.

## Referências

Visão consolidada a partir do pitch fornecido pela equipe e do [diagrama conceitual no Excalidraw](https://excalidraw.com/#json=VBUeqRJwS12Iay5aFPKbN,TC-AKTpXv0ZYT-SRa_8o-w), consultado em 2 de novembro de 2026. O mapa de responsabilidades está documentado em [Arquitetura](ARQUITETURA.md).
