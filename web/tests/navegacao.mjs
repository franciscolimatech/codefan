// Executar com o preview ativo e Playwright disponível no ambiente de validação.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
await mkdir("test-results", { recursive: true });
import { questoes } from "../src/data/nivelamento.js";
import { conceitos } from "../src/data/mockData.js";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const base = process.env.CODEFAN_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const erros = [];
page.on("pageerror", (error) => erros.push(error.message));
const ir = async (path) => {
  await page.goto(`${base}${path}`);
  await page.locator("h1").first().waitFor();
};
const textoSemRemovidos = async () =>
  assert.doesNotMatch(
    await page.locator("body").innerText(),
    /comunidades?|arenas?/i,
  );
const salvo = (chave) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)), chave);

try {
  await ir("/");
  await textoSemRemovidos();
  await page.getByRole("link", { name: "Fazer meu nivelamento" }).click();
  await page
    .getByRole("button", { name: "Banco de Dados", exact: false })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Iniciar nivelamento" })
      .isDisabled(),
    true,
  );
  await page
    .getByRole("button", { name: "Backend com Python", exact: false })
    .click();
  await page.getByRole("button", { name: "Iniciar nivelamento" }).click();
  assert.equal(
    await page.getByRole("button", { name: "Próxima questão" }).isDisabled(),
    true,
  );
  await page.getByRole("button", { name: "B 60", exact: true }).click();
  await page.getByRole("button", { name: "Preciso de uma orientação" }).click();
  await page.getByRole("button", { name: "Ocultar orientação" }).click();
  await page.getByRole("link", { name: "Sair e continuar depois" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Continuar nivelamento" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "B 60", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.ok((await salvo("codefan-assessment")).helped.includes(0));
  await page.getByRole("button", { name: "Próxima questão" }).click();
  // Acerto assistido, erro, não sei, duas respostas independentes de funções e não sei.
  const answers = [1, 1, 3, 2, 1, 3];
  for (let i = 1; i < answers.length; i++) {
    const q = questoes[i];
    await page
      .getByRole("button", {
        name: `${String.fromCharCode(65 + answers[i])} ${q.options[answers[i]]}`,
        exact: true,
      })
      .click();
    await page
      .getByRole("button", {
        name: i === 5 ? "Finalizar nivelamento" : "Próxima questão",
      })
      .click();
  }
  await page
    .getByRole("heading", { name: "Seu mapa de habilidades" })
    .waitFor();
  await page.reload();
  assert.ok(page.url().endsWith("/nivelamento/resultado"));
  assert.equal(
    await page
      .locator("span")
      .filter({ hasText: /^CONSISTENTE$/ })
      .count(),
    0,
  );
  assert.equal(
    await page
      .locator("span")
      .filter({ hasText: /^PRATICANDO$/ })
      .count(),
    1,
  );
  const diagnostico = await salvo("codefan-assessment");
  assert.deepEqual(
    diagnostico.responses.map((r) => r.kind),
    [
      "assistida",
      "incorreta",
      "ignorada",
      "independente",
      "independente",
      "ignorada",
    ],
  );
  await page.getByRole("link", { name: "Começar trilha recomendada" }).click();
  await page
    .getByRole("link", { name: /Desafio final: Agenda de Contatos/ })
    .click();
  await page.getByRole("button", { name: "Não sei por onde começar" }).click();
  await page.getByRole("dialog").waitFor();
  await page
    .getByRole("link", { name: "Aprender Dicionários", exact: true })
    .click();
  await page.getByRole("button", { name: "Praticar", exact: true }).click();
  for (let i = 0; i < conceitos.dicionarios.exercicios.length; i++) {
    const exercicio = conceitos.dicionarios.exercicios[i];
    await page
      .getByRole("button", {
        name: exercicio.opcoes[exercicio.correta],
        exact: true,
      })
      .click();
    await page
      .getByRole("button", {
        name:
          i === conceitos.dicionarios.exercicios.length - 1
            ? "Concluir"
            : "Próximo exercício",
      })
      .click();
  }
  await page.getByRole("link", { name: "Voltar ao desafio" }).last().click();
  await page.locator('a[href="/resolver/d12"]').first().click();
  await page.getByRole("button", { name: "Não sei por onde começar" }).click();
  await page.getByRole("dialog").waitFor();
  await page.getByRole("button", { name: "Continuar mesmo assim" }).click();
  await page.getByRole("button", { name: "Dicas", exact: true }).click();
  for (let n = 1; n <= 3; n++)
    await page.getByRole("button", { name: `Revelar dica ${n}` }).click();
  await page
    .getByRole("textbox", { name: "Editor de código" })
    .fill('# Rascunho para demonstrar a navegação\nprint("CodeFan")');
  await page.reload();
  assert.match(
    await page.getByRole("textbox", { name: "Editor de código" }).inputValue(),
    /Rascunho/,
  );
  await page.getByRole("button", { name: "Dicas", exact: true }).click();
  assert.equal(
    await page.getByRole("button", { name: /Revelar dica/ }).count(),
    0,
  );
  await page.getByRole("button", { name: "Simular execução" }).click();
  await page.getByText("> Execução simulada:", { exact: false }).waitFor();
  await page.getByRole("button", { name: "Simular submissão" }).click();
  await page
    .getByRole("heading", { name: "Prática demonstrativa registrada" })
    .waitFor();
  const progresso = await salvo("codefan-progresso-v1");
  assert.equal(progresso.desafiosResolvidos.length, 5);
  assert.ok(progresso.etapasConcluidas["python-fundamentos"].includes("py-6"));
  assert.ok(progresso.etapasConcluidas["python-fundamentos"].includes("py-8"));
  await page.getByRole("link", { name: "Voltar para Desafios" }).click();
  await page.getByText("Mostrar resolvidos", { exact: true }).click();
  assert.equal(await page.locator('a[href="/desafios/d12"]').count(), 1);
  await ir("/perfil");
  await page.getByRole("button", { name: "Habilidades", exact: true }).click();
  assert.match(
    await page.locator("main").innerText(),
    /resposta assistida no nivelamento/,
  );
  for (const tab of ["Conquistas", "Histórico", "Progresso"]) {
    await page.getByRole("button", { name: tab, exact: true }).click();
    await textoSemRemovidos();
  }
  await ir("/professor");
  await page.getByRole("button", { name: "Aprendizagem", exact: true }).click();
  assert.match(await page.locator("main").innerText(), /5 desafios praticados/);
  assert.match(await page.locator("main").innerText(), /assistida/);
  await textoSemRemovidos();
  await ir("/");
  await page.getByRole("button", { name: "Notificações" }).click();
  await textoSemRemovidos();
  await page.getByRole("link", { name: "Ver resultado", exact: true }).click();
  await page.getByRole("link", { name: "Refazer nivelamento" }).click();
  await page.getByRole("button", { name: "Refazer nivelamento" }).click();
  const novaTentativa = await salvo("codefan-assessment");
  assert.equal(novaTentativa.completed, false);
  assert.deepEqual(novaTentativa.answers, []);
  assert.deepEqual(novaTentativa.helped, []);
  assert.deepEqual(await salvo("codefan-progresso-v1"), progresso);
  console.log(
    "PASS: fluxo completo, dicas, classificação, persistência, conceitos, Resolver e nova tentativa.",
  );

  for (const path of [
    "/",
    "/nivelamento",
    "/nivelamento/questoes",
    "/trilhas",
    "/trilhas/python-fundamentos",
    "/desafios",
    "/desafios/d12",
    "/resolver/d12",
    "/conceitos/dicionarios",
    "/perfil",
    "/professor",
    "/configuracoes",
    "/login",
  ]) {
    await ir(path);
    await textoSemRemovidos();
  }
  for (const path of [
    "/comunidades",
    "/comunidades/c1",
    "/comunidades/c1/membros",
    "/arena",
    "/arena/a1/lobby",
    "/arena/a1/ativa",
  ]) {
    await ir(path);
    assert.equal(new URL(page.url()).pathname, "/");
    await textoSemRemovidos();
  }
  console.log(
    "PASS: 13 rotas úteis e 6 rotas removidas redirecionadas para a Home.",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/nivelamento",
    "/nivelamento/questoes",
    "/trilhas",
    "/trilhas/python-fundamentos",
    "/desafios/d12",
    "/resolver/d12",
    "/perfil",
    "/professor",
    "/configuracoes",
  ]) {
    await ir(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, `Rolagem horizontal em ${path}`);
  }
  await ir("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("link", { name: "Nivelamento", exact: true }).click();
  assert.ok(page.url().endsWith("/nivelamento"));
  await page
    .getByRole("heading", { name: "Descubra onde você está.", exact: true })
    .waitFor();
  await page.waitForFunction(
    () => document.querySelector("aside").getBoundingClientRect().right <= 1,
  );
  await ir("/nivelamento");
  await page.screenshot({
    path: "test-results/nivelamento-mobile.png",
    fullPage: true,
  });
  console.log("PASS: 10 telas a 390px e navegação pelo menu móvel.");

  // JSON corrompido, tentativa incompleta e índice fora de faixa não quebram o app.
  await page.evaluate(() => {
    localStorage.setItem("codefan-progresso-v1", "{quebrado");
    localStorage.setItem(
      "codefan-assessment",
      JSON.stringify({
        answers: [1, 99],
        index: 100,
        helped: [0, -1, 99],
        selected: 100,
        completed: true,
      }),
    );
  });
  await ir("/nivelamento/questoes");
  assert.match(await page.locator("main").innerText(), /Questão 2 de 6/);
  await ir("/nivelamento/resultado");
  assert.equal(new URL(page.url()).pathname, "/nivelamento");
  const bloqueado = await browser.newContext();
  await bloqueado.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Storage bloqueado");
    };
    Storage.prototype.getItem = () => {
      throw new Error("Storage bloqueado");
    };
  });
  const paginaBloqueada = await bloqueado.newPage();
  paginaBloqueada.on("pageerror", (error) => erros.push(error.message));
  await paginaBloqueada.goto(base);
  await paginaBloqueada
    .getByText("O armazenamento local está indisponível.", { exact: false })
    .waitFor();
  await paginaBloqueada
    .getByRole("link", { name: "Fazer meu nivelamento" })
    .click();
  await paginaBloqueada
    .getByRole("button", { name: "Iniciar nivelamento" })
    .click();
  await paginaBloqueada
    .getByRole("button", { name: "B 60", exact: true })
    .click();
  await paginaBloqueada
    .getByRole("button", { name: "Próxima questão" })
    .click();
  assert.match(
    await paginaBloqueada.locator("main").innerText(),
    /Questão 2 de 6/,
  );
  assert.deepEqual(erros, []);
  console.log(
    "PASS: recuperação de dados corrompidos e armazenamento bloqueado; zero erros de execução.",
  );
} finally {
  await browser.close();
}
