import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Route,
  Target,
  Sparkles,
  Code2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { trilhas, getDesafio } from '../data/mockData';
import { destinoEtapa, habilidadePorId } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';

export default function Home() {
  const {
    usuario,
    progresso,
    resumoTrilha,
    nivelamento,
    recomendacao,
    atividades,
    armazenamentoDisponivel,
  } = useProgresso();
  const atual =
    trilhas.find((t) => t.id === progresso.ultimaTrilha) || trilhas[0];
  const resumo = resumoTrilha(atual);
  const recomendada = trilhas.find((t) => t.id === recomendacao.trilhaId);
  const desafio = getDesafio(recomendacao.desafioId);
  const retomando =
    nivelamento.answers.length ||
    nivelamento.selected !== null ||
    nivelamento.helped.length;
  const destinoNivelamento = nivelamento.completed
    ? '/nivelamento/resultado'
    : '/nivelamento';
  return (
    <div className="mvp-page max-w-6xl">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="mvp-eyebrow">SEU ESPAÇO DE EVOLUÇÃO</p>
          <h1 className="mvp-title">
            Olá, {usuario.nome.split(' ')[0]}
            <span className="text-[#7c5cfc]">.</span>
          </h1>
          <p className="mvp-muted mt-3">
            Mais um dia para transformar curiosidade em conhecimento.
          </p>
        </div>
        <p className="mvp-note">
          <Sparkles size={16} />
          Um conceito de cada vez
        </p>
      </header>
      {!armazenamentoDisponivel && (
        <p className="mvp-note" role="status">
          O armazenamento local está indisponível. Seu progresso será mantido
          apenas nesta sessão.
        </p>
      )}
      <section className="mvp-card flex flex-wrap items-center gap-5">
        <div className="w-12 h-12 rounded-full border-2 border-[#7c5cfc] text-[#a28aff] flex items-center justify-center text-lg font-bold">
          {usuario.nivel}
        </div>
        <div className="flex-1 min-w-40">
          <h2 className="text-sm font-semibold">
            Seu aprendizado está evoluindo
          </h2>
          <p className="mvp-muted mt-1">
            Nível {usuario.nivel} · {usuario.xp} de {usuario.xpProximoNivel} XP
          </p>
        </div>
        <div className="w-full sm:w-48 space-y-2">
          <p className="text-xs text-[#8b90a5]">
            {Math.max(0, usuario.xpProximoNivel - usuario.xp)} XP para o próximo
            nível
          </p>
          <div className="mvp-progress">
            <span
              style={{
                width: `${Math.min(100, (usuario.xp / usuario.xpProximoNivel) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-orange-400 sm:border-l border-[#252a3a] sm:pl-5">
          <Flame size={20} />
          <div>
            <strong className="text-sm">{usuario.sequenciaDias} dias</strong>
            <p className="text-xs text-[#8b90a5]">de constância</p>
          </div>
        </div>
      </section>
      <section className="mvp-card flex flex-col md:flex-row md:items-center gap-5 !border-[#7c5cfc]/30 bg-gradient-to-r from-[#12141f] to-[#181b2a]">
        <span className="mvp-icon">
          <Route size={26} />
        </span>
        <div className="flex-1 space-y-2">
          <p className="mvp-eyebrow">CONTINUE APRENDENDO</p>
          <h2 className="text-xl font-semibold">{atual.nome}</h2>
          <p className="mvp-muted">
            {resumo.etapaAtual
              ? `Etapa ${resumo.indiceAtual + 1} de ${resumo.total} · ${resumo.etapaAtual.titulo}`
              : 'Trilha concluída · você pode revisar os conceitos'}
          </p>
          <div className="flex gap-1.5 pt-1">
            {atual.etapas.map((e) => (
              <span
                key={e.id}
                className={`h-1.5 w-6 rounded-full ${progresso.etapasConcluidas[atual.id]?.includes(e.id) ? 'bg-[#7c5cfc]' : 'bg-[#252a3a]'}`}
              />
            ))}
          </div>
        </div>
        <Link
          className="mvp-button"
          to={
            resumo.etapaAtual
              ? destinoEtapa(atual, resumo.etapaAtual)
              : `/trilhas/${atual.id}`
          }
        >
          {resumo.etapaAtual ? 'Continuar trilha' : 'Revisar trilha'}
          <ArrowRight size={16} />
        </Link>
      </section>
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Target size={19} />
            Seu nivelamento
          </h2>
          <div className="mvp-card space-y-5 h-[calc(100%-2.75rem)]">
            <div className="flex items-center justify-between gap-3">
              <span className="mvp-icon">
                <Code2 size={23} />
              </span>
              <p className="mvp-eyebrow">
                {nivelamento.completed
                  ? 'DIAGNÓSTICO INICIAL'
                  : 'SEU PONTO DE PARTIDA'}
              </p>
            </div>
            <h3 className="text-xl font-semibold">Backend com Python</h3>
            <p className="mvp-muted">
              {nivelamento.completed
                ? 'Seu mapa inicial reúne as evidências desta tentativa.'
                : 'Descubra seus conhecimentos atuais, sem nota e sem julgamento.'}
            </p>
            <div className="border-t border-[#252a3a] pt-4 space-y-3">
              {nivelamento.completed ? (
                <>
                  <p className="mvp-muted">
                    Trilha recomendada:{' '}
                    <strong className="text-[#e4e6ef]">
                      {recomendada.nome}
                    </strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recomendacao.lacunas.map((h) => (
                      <span
                        key={h.habilidadeId}
                        className="bg-[#181b2a] rounded px-2 py-1 text-xs text-[#8b90a5]"
                      >
                        {habilidadePorId(h.habilidadeId)?.nome}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="mvp-note">
                  <Clock size={15} />
                  Cerca de 5 minutos ·{' '}
                  {nivelamento.answers.length
                    ? `${nivelamento.answers.length} de 6 respostas registradas`
                    : '6 questões'}
                </p>
              )}
            </div>
            <Link className="mvp-link" to={destinoNivelamento}>
              {nivelamento.completed
                ? 'Ver resultado'
                : retomando
                  ? 'Continuar nivelamento'
                  : 'Fazer meu nivelamento'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles size={19} />
            {nivelamento.completed
              ? 'Mais evidências, novos passos'
              : 'Um caminho feito para você'}
          </h2>
          <div className="mvp-card space-y-5 h-[calc(100%-2.75rem)]">
            <p className="mvp-muted">
              {nivelamento.completed
                ? 'Habilidades que precisam de mais evidências nesta tentativa. O diagnóstico pode evoluir com a prática.'
                : 'Comece pelo nivelamento ou continue explorando as trilhas. Você escolhe seu ritmo.'}
            </p>
            {nivelamento.completed ? (
              (recomendacao.lacunas.length
                ? recomendacao.lacunas
                : recomendacao.mapa
              )
                .slice(0, 3)
                .map((h) => (
                  <Link
                    key={h.habilidadeId}
                    to={`/conceitos/${h.habilidadeId}?trilha=${recomendada.id}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between py-3 border-b border-[#252a3a]"
                  >
                    <span className="text-sm font-medium">
                      {habilidadePorId(h.habilidadeId)?.nome}
                    </span>
                    <EstadoHabilidade estado={h.estado} />
                  </Link>
                ))
            ) : (
              <div className="space-y-4">
                <span className="mvp-icon">
                  <BookOpen size={25} />
                </span>
                <h3 className="font-semibold">
                  Conceitos, desafios e orientação
                </h3>
                <p className="mvp-muted">
                  Cada desafio conecta os conhecimentos necessários aos
                  conceitos curtos e às dicas progressivas.
                </p>
              </div>
            )}
            <p className="mvp-note">
              Pedir ajuda faz parte do aprendizado, não é uma penalidade.
            </p>
            <Link
              className="mvp-link"
              to={
                nivelamento.completed
                  ? `/trilhas/${recomendada.id}`
                  : '/trilhas'
              }
            >
              {nivelamento.completed
                ? 'Abrir trilha recomendada'
                : 'Explorar trilhas'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Code2 size={19} />
            Desafio recomendado
          </h2>
          <div className="mvp-card space-y-4">
            <div className="flex justify-between gap-3">
              <p className="mvp-eyebrow">PARA PRATICAR SEU PRÓXIMO PASSO</p>
              <span
                className={`text-xs ${desafio.dificuldade === 'Fácil' ? 'text-emerald-400' : desafio.dificuldade === 'Médio' ? 'text-amber-400' : 'text-red-400'}`}
              >
                {desafio.dificuldade}
              </span>
            </div>
            <h3 className="text-xl font-semibold">{desafio.titulo}</h3>
            <p className="mvp-muted">
              Use listas, dicionários e funções para organizar nomes e
              telefones.
            </p>
            <p className="mvp-note">
              {nivelamento.completed
                ? 'Pratique as habilidades avaliadas em um desafio da trilha de Python.'
                : 'Uma sugestão da trilha de Python. Faça o nivelamento para observar seu ponto de partida.'}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#252a3a]">
              <span className="text-xs text-[#8b90a5]">
                Python · Dicionários · Funções
              </span>
              <Link className="mvp-link" to={`/desafios/${desafio.id}`}>
                Ver desafio
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock size={19} />
            Atividade recente
          </h2>
          <div className="mvp-card !py-2 divide-y divide-[#252a3a]">
            {atividades.slice(0, 3).map((a) => (
              <Link
                key={a.id}
                to={a.destino}
                className="flex items-center gap-4 py-4 hover:text-[#a28aff]"
              >
                <span className="mvp-icon !w-9 !h-9 shrink-0">
                  {a.tipo === 'desafio' ? (
                    <Code2 size={16} />
                  ) : a.tipo === 'nivelamento' ? (
                    <Target size={16} />
                  ) : (
                    <BookOpen size={16} />
                  )}
                </span>
                <span className="text-sm">{a.text}</span>
                <ArrowRight size={14} className="ml-auto shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <footer className="mvp-footer">
        Liberdade para explorar, orientação para não se perder.
      </footer>
    </div>
  );
}
