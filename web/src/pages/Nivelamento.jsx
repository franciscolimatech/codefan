import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Code2,
  Database,
  LayoutTemplate,
  Info,
  BookOpen,
  Route,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useProgresso } from '../context/ProgressoContext';
import {
  questoes,
  evidenciaNivelamento,
  habilidadesNivelamento,
} from '../data/nivelamento';
import { habilidadePorId } from '../data/aprendizagem';
import { trilhas } from '../data/mockData';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';

const areas = [
  {
    nome: 'Backend com Python',
    icon: Code2,
    descricao: 'A base para construir soluções com código.',
    tags: 'Python · Lógica · Estruturas de dados',
    disponivel: true,
  },
  {
    nome: 'Banco de Dados',
    icon: Database,
    descricao: 'Organize dados e encontre as respostas certas.',
    tags: 'SQL · Consultas · JOIN · Modelagem',
    disponivel: false,
  },
  {
    nome: 'Frontend',
    icon: LayoutTemplate,
    descricao: 'Transforme ideias em interfaces interativas.',
    tags: 'HTML/CSS · JavaScript · React',
    disponivel: false,
  },
];

export default function Nivelamento() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    nivelamento,
    recomendacao,
    armazenamentoDisponivel,
    iniciarNivelamento,
    selecionarResposta,
    pedirDicaNivelamento,
    registrarResposta,
  } = useProgresso();
  const [area, setArea] = useState(areas[0].nome);
  const [dicaOculta, setDicaOculta] = useState(false);
  const retomando =
    nivelamento.answers.length > 0 ||
    nivelamento.selected !== null ||
    nivelamento.helped.length > 0;
  const iniciar = () => {
    iniciarNivelamento();
    setDicaOculta(false);
    navigate('/nivelamento/questoes');
  };
  const trilha = trilhas.find((t) => t.id === recomendacao.trilhaId);
  const nomesLacunas = recomendacao.lacunas
    .map((h) => habilidadePorId(h.habilidadeId)?.nome)
    .join(', ');

  if (pathname.endsWith('/resultado') && !nivelamento.completed)
    return <Navigate to="/nivelamento" replace />;
  if (pathname.endsWith('/questoes') && nivelamento.completed)
    return <Navigate to="/nivelamento/resultado" replace />;

  return (
    <div
      className={`mvp-page ${pathname.endsWith('/questoes') ? 'max-w-3xl' : 'max-w-6xl'}`}
    >
      {!armazenamentoDisponivel && (
        <p role="status" className="mvp-note">
          O navegador não permitiu salvar os dados. Você pode continuar nesta
          sessão, mas a tentativa não será retomada ao recarregar.
        </p>
      )}
      {pathname === '/nivelamento' && (
        <>
          <header>
            <p className="mvp-eyebrow">NIVELAMENTO TÉCNICO</p>
            <h1 className="mvp-title">
              Descubra onde você está<span className="text-[#7c5cfc]">.</span>
            </h1>
            <p className="mvp-muted mt-3">
              Escolha uma área para observar seus conhecimentos atuais e
              encontrar seu próximo passo.
            </p>
          </header>
          <div className="mvp-process">
            <span>
              <Target size={18} />
              Nivelamento
            </span>
            <ArrowRight size={16} />
            <span>Lacunas identificadas</span>
            <ArrowRight size={16} />
            <span>
              <Route size={18} />
              Trilha recomendada
            </span>
          </div>
          <h2 className="text-lg font-semibold">
            Qual área você quer explorar?
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {areas.map((a) => (
              <button
                key={a.nome}
                aria-pressed={area === a.nome}
                onClick={() => setArea(a.nome)}
                className={`mvp-card text-left flex flex-col gap-4 transition-colors ${area === a.nome ? '!border-[#7c5cfc]' : 'hover:border-[#7c5cfc]/40'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="mvp-icon">
                    <a.icon size={26} />
                  </span>
                  {area === a.nome && (
                    <Check size={18} className="text-[#7c5cfc]" />
                  )}
                </div>
                <span className="mvp-eyebrow">
                  {a.disponivel ? 'DISPONÍVEL NA DEMONSTRAÇÃO' : 'EM BREVE'}
                </span>
                <h3 className="text-xl font-semibold">{a.nome}</h3>
                <p className="mvp-muted">{a.descricao}</p>
                <p className="mvp-muted text-xs">{a.tags}</p>
                <span className="text-xs mt-auto pt-3 border-t border-[#252a3a] text-[#8b90a5]">
                  {a.disponivel
                    ? '6 questões · cerca de 5 minutos'
                    : 'Nivelamento ainda indisponível'}
                </span>
              </button>
            ))}
          </div>
          <div className="mvp-card flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h3 className="font-semibold">
                {area === areas[0].nome
                  ? 'Não é uma prova. É um ponto de partida.'
                  : 'Esta área estará disponível em breve.'}
              </h3>
              <p className="mvp-muted mt-2">
                {area !== areas[0].nome
                  ? 'Explore o nivelamento de Backend com Python nesta demonstração.'
                  : nivelamento.completed
                    ? 'Refazer substitui o diagnóstico anterior. Seu progresso nas trilhas é preservado.'
                    : retomando
                      ? `${nivelamento.answers.length} de ${questoes.length} respostas registradas. Você pode continuar de onde parou.`
                      : 'Tudo bem não saber. Pedir ajuda faz parte do aprendizado.'}
              </p>
            </div>
            <button
              disabled={area !== areas[0].nome}
              className="mvp-button shrink-0"
              onClick={iniciar}
            >
              {nivelamento.completed
                ? 'Refazer nivelamento'
                : retomando
                  ? 'Continuar nivelamento'
                  : 'Iniciar nivelamento'}
              <ArrowRight size={16} />
            </button>
          </div>
          {nivelamento.completed && (
            <Link className="mvp-link" to="/nivelamento/resultado">
              Ver resultado atual <ArrowRight size={16} />
            </Link>
          )}
          <p className="mvp-note">
            <Info size={16} />
            Sem nota genérica. Você recebe um mapa inicial de evidências por
            habilidade.
          </p>
        </>
      )}
      {pathname.endsWith('/questoes') &&
        (() => {
          const q = questoes[nivelamento.index];
          const usouDica = nivelamento.helped.includes(nivelamento.index);
          return (
            <>
              <div className="flex items-center justify-between gap-3">
                <Link className="mvp-link text-[#8b90a5]" to="/nivelamento">
                  <ArrowLeft size={16} />
                  Sair e continuar depois
                </Link>
                <span className="mvp-muted text-xs">Backend com Python</span>
              </div>
              <div>
                <div className="flex justify-between mb-3 text-sm">
                  <strong>
                    Questão {nivelamento.index + 1} de {questoes.length}
                  </strong>
                  <span className="text-[#8b90a5]">Um passo de cada vez</span>
                </div>
                <div className="mvp-progress">
                  <span
                    style={{
                      width: `${((nivelamento.index + 1) / questoes.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <section className="mvp-card space-y-5">
                <p className="mvp-eyebrow">
                  HABILIDADE: {habilidadePorId(q.skill)?.nome.toUpperCase()}
                </p>
                <h1 className="text-2xl font-semibold">{q.title}</h1>
                <p className="mvp-muted">
                  Escolha a alternativa que faz sentido para você.
                </p>
                <div className="rounded-xl overflow-hidden border border-[#252a3a]">
                  <div className="bg-[#181b2a] px-4 py-2 text-xs text-[#8b90a5]">
                    exemplo.py · Python
                  </div>
                  <pre className="code-font bg-[#0b0d14] p-5 text-sm overflow-x-auto">
                    {q.code}
                  </pre>
                </div>
                <div className="space-y-3">
                  {q.options.map((o, i) => (
                    <button
                      key={o}
                      aria-pressed={nivelamento.selected === i}
                      onClick={() => selecionarResposta(i)}
                      className={`w-full flex items-center gap-3 text-left border rounded-lg p-4 ${nivelamento.selected === i ? 'border-[#7c5cfc] bg-[#7c5cfc]/10' : 'border-[#252a3a] bg-[#181b2a] hover:border-[#7c5cfc]/40'}`}
                    >
                      <span className="text-[#8b90a5] text-xs border border-[#252a3a] rounded px-2 py-1">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{o}</span>
                      {nivelamento.selected === i && (
                        <Check size={16} className="text-[#7c5cfc]" />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  className="mvp-link"
                  onClick={() => {
                    if (usouDica && !dicaOculta) setDicaOculta(true);
                    else {
                      pedirDicaNivelamento();
                      setDicaOculta(false);
                    }
                  }}
                >
                  <BookOpen size={16} />
                  {usouDica && !dicaOculta
                    ? 'Ocultar orientação'
                    : 'Preciso de uma orientação'}
                </button>
                {usouDica && !dicaOculta && (
                  <div className="bg-[#7c5cfc]/5 border border-[#7c5cfc]/30 rounded-lg p-4 space-y-2">
                    <strong className="text-sm">
                      Um conceito para te ajudar
                    </strong>
                    <p className="mvp-muted">{q.concept}</p>
                    <p className="text-xs text-[#8b90a5]">
                      Um acerto após abrir a dica é registrado como evidência
                      assistida, mesmo se você ocultar a orientação.
                    </p>
                  </div>
                )}
              </section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="mvp-note">
                  <Info size={16} />
                  Não saber ainda também é uma resposta.
                </p>
                <button
                  className="mvp-button"
                  disabled={nivelamento.selected === null}
                  onClick={() => {
                    registrarResposta();
                    setDicaOculta(false);
                    if (nivelamento.index === questoes.length - 1)
                      navigate('/nivelamento/resultado');
                  }}
                >
                  {nivelamento.index === questoes.length - 1
                    ? 'Finalizar nivelamento'
                    : 'Próxima questão'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          );
        })()}
      {pathname.endsWith('/resultado') && (
        <>
          <header>
            <p className="mvp-eyebrow">NIVELAMENTO CONCLUÍDO</p>
            <h1 className="mvp-title">Seu nivelamento — Backend com Python</h1>
            <p className="mvp-muted mt-3">
              Um retrato desta tentativa. Seu progresso acumulado nas trilhas
              continua disponível no Perfil.
            </p>
          </header>
          <h2 className="text-lg font-semibold">Seu mapa de habilidades</h2>
          <div className="mvp-card !p-0 divide-y divide-[#252a3a]">
            {habilidadesNivelamento.map((id) => {
              const ev = evidenciaNivelamento(id, nivelamento);
              return (
                <div
                  key={id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {habilidadePorId(id)?.nome}
                    </h3>
                    <p className="mvp-muted mt-1">{ev.descricao}</p>
                    <p className="text-xs text-[#8b90a5] mt-2">
                      Respostas: {ev.resumo}
                    </p>
                  </div>
                  <EstadoHabilidade estado={ev.estado} />
                </div>
              );
            })}
          </div>
          <p className="mvp-note">
            <Info size={16} />
            CONSISTENTE exige prática recorrente em desafios e checkpoints. Este
            nivelamento inicial não atribui esse estado.
          </p>
          <p className="mvp-note">
            Respostas incorretas ou ignoradas não comprovam ausência de
            conhecimento. Dicas registram evidência assistida, sem penalização.
          </p>
          <section className="mvp-card flex flex-col sm:flex-row gap-5 border-[#7c5cfc]/30">
            <span className="mvp-icon shrink-0">
              <Route size={26} />
            </span>
            <div className="space-y-4">
              <p className="mvp-eyebrow">TRILHA RECOMENDADA</p>
              <h2 className="text-2xl font-semibold">{trilha.nome}</h2>
              <p className="mvp-muted">
                {nomesLacunas
                  ? `Nesta tentativa, ${nomesLacunas} precisam de mais evidências. A trilha oferece conceitos e prática nessas habilidades.`
                  : 'Continue praticando para confirmar suas evidências iniciais.'}
              </p>
              <p className="text-xs text-[#8b90a5]">
                Recomendação de Python nesta demonstração ·{' '}
                {trilha.etapas.length} etapas · Conceitos + desafios · No seu
                ritmo
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link className="mvp-button" to={`/trilhas/${trilha.id}`}>
                  Começar trilha recomendada
                  <ArrowRight size={16} />
                </Link>
                <Link className="mvp-link" to="/trilhas">
                  Explorar outras trilhas
                </Link>
              </div>
            </div>
          </section>
          <div className="flex justify-between gap-4">
            <Link className="mvp-link" to="/nivelamento">
              Refazer nivelamento
            </Link>
            <Link className="mvp-link" to="/">
              Voltar ao início
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
      <footer className="mvp-footer">
        Liberdade para explorar, orientação para não se perder.
      </footer>
    </div>
  );
}
