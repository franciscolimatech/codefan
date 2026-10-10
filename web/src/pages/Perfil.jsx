import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Trophy,
  Code2,
  Target,
  Star,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Lock,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { habilidades, trilhas } from '../data/mockData';
import { descreverEvidencia } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade, {
  ESTADO_META,
  Segmentos,
} from '../components/aprendizagem/EstadoHabilidade';

export default function Perfil() {
  const [activeTab, setActiveTab] = useState('Progresso');
  const {
    evidenciaDe,
    estadoDe,
    progresso,
    usuario,
    atividades,
    nivelamento,
    recomendacao,
    resumoTrilha,
  } = useProgresso();
  const currentUser = {
    ...usuario,
    level: usuario.nivel,
    xpNext: usuario.xpProximoNivel,
    streak: usuario.sequenciaDias,
  };
  const atividadesRecentes = atividades.map((a) => ({
    ...a,
    icon:
      a.tipo === 'desafio'
        ? Code2
        : a.tipo === 'nivelamento'
          ? Target
          : BookOpen,
    timestamp: 'Registro da demonstração local',
  }));
  const historico = atividadesRecentes.map((a) => ({
    ...a,
    date: 'Registro local',
    result: a.tipo === 'desafio' ? 'Prática simulada' : 'Aprendizagem',
  }));
  const conquistas = [
    {
      id: 1,
      icon: '🔥',
      title: 'Primeiros Passos',
      description: 'Registrou a prática de um desafio.',
      earned: progresso.desafiosResolvidos.length > 0,
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Meu Ponto de Partida',
      description: 'Concluiu o nivelamento de Python.',
      earned: nivelamento.completed,
    },
    {
      id: 3,
      icon: '📚',
      title: 'Um Conceito de Cada Vez',
      description: 'Concluiu uma prática guiada.',
      earned: progresso.conceitosPraticados.length > 0,
    },
    {
      id: 4,
      icon: '🏆',
      title: 'Lenda Viva',
      description: 'Alcançou o nível 50.',
      earned: currentUser.nivel >= 50,
      progresso: currentUser.nivel,
      max: 50,
    },
  ];
  const trilhasIniciadas = trilhas.filter(
    (t) => resumoTrilha(t).iniciada
  ).length;
  const etapasFeitas = trilhas.reduce(
    (total, t) => total + resumoTrilha(t).concluidas,
    0
  );

  const linhasHabilidades = habilidades.map((h) => ({
    ...h,
    estado: estadoDe(h.id),
    evidencia: evidenciaDe(h.id),
  }));
  const praticadas = linhasHabilidades
    .filter((h) => h.estado !== 'nao_praticado')
    .sort(
      (a, b) =>
        ESTADO_META[b.estado].nivel - ESTADO_META[a.estado].nivel ||
        a.nome.localeCompare(b.nome)
    );
  const naoPraticadas = linhasHabilidades.filter(
    (h) => h.estado === 'nao_praticado'
  );

  const tabs = ['Progresso', 'Habilidades', 'Conquistas', 'Histórico'];

  return (
    <div className="min-h-screen p-4 sm:p-8 text-[#e4e6ef] max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#7c5cfc]/20 flex flex-shrink-0 items-center justify-center text-[#7c5cfc] text-3xl font-bold border-2 border-[#7c5cfc]">
          {currentUser.iniciais}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-4 w-full">
          <div>
            <h1 className="text-2xl font-bold text-[#e4e6ef]">
              {currentUser.nome}
            </h1>
            <p className="text-sm text-[#8b90a5]">{currentUser.email}</p>
            <div className="inline-flex items-center gap-1.5 bg-[#7c5cfc]/10 text-[#7c5cfc] text-xs font-medium px-2.5 py-1 rounded-full mt-2">
              <Star className="w-3.5 h-3.5" />
              {currentUser.titulo}
            </div>
          </div>

          {/* Level and XP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#e4e6ef]">
                Nível {currentUser.level}
              </span>
              <span className="text-[#8b90a5]">
                {currentUser.xp} / {currentUser.xpNext} XP
              </span>
            </div>
            <div className="bg-[#181b2a] rounded-full h-2 w-full overflow-hidden">
              <div
                className="bg-[#7c5cfc] h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (currentUser.xp / currentUser.xpNext) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Stats (Streak & Badges) */}
        <div className="flex flex-row md:flex-col gap-4">
          <div className="bg-[#181b2a] rounded-lg p-3 flex items-center gap-3 border border-[#252a3a]">
            <div className="bg-amber-500/20 p-2 rounded-full text-amber-500">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#8b90a5]">Ofensiva</p>
              <p className="font-bold text-[#e4e6ef]">
                {currentUser.streak} dias
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mvp-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="mvp-eyebrow">MEU NIVELAMENTO</p>
          <h2 className="font-semibold mt-2">Backend com Python</h2>
          <p className="mvp-muted mt-1">
            {nivelamento.completed
              ? 'Diagnóstico concluído. Seu progresso abaixo reúne também a prática nas trilhas.'
              : 'Identifique seu ponto de partida e receba orientação.'}
          </p>
        </div>
        <Link
          className="mvp-button"
          to={nivelamento.completed ? '/nivelamento/resultado' : '/nivelamento'}
        >
          {nivelamento.completed ? 'Ver resultado' : 'Fazer meu nivelamento'}
        </Link>
      </section>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#252a3a] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc]' : 'text-[#8b90a5] hover:text-[#e4e6ef]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {nivelamento.completed && (
        <Link className="mvp-link" to={`/trilhas/${recomendacao.trilhaId}`}>
          Trilha recomendada: Fundamentos de Python
        </Link>
      )}
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'Progresso' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
                  <Code2 className="w-5 h-5 text-[#7c5cfc]" />
                  <span className="text-sm font-medium">Desafios</span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-[#e4e6ef]">
                    {progresso.desafiosResolvidos.length}
                  </h3>
                  <div className="flex items-center text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Prática local
                  </div>
                </div>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">
                    Conceitos praticados
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {progresso.conceitosPraticados.length}
                </h3>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">Trilhas iniciadas</span>
                </div>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {trilhasIniciadas}
                </h3>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">Etapas concluídas</span>
                </div>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {etapasFeitas}
                </h3>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#e4e6ef] mb-4">
                Atividade Recente
              </h2>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-hidden">
                {atividadesRecentes.slice(0, 5).map((atividade, idx) => (
                  <div
                    key={atividade.id}
                    className={`p-4 flex items-center justify-between ${idx !== atividadesRecentes.length - 1 ? 'border-b border-[#252a3a]' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#181b2a] flex items-center justify-center text-[#8b90a5]">
                        <atividade.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Link
                          to={atividade.destino}
                          className="text-sm font-medium text-[#e4e6ef] hover:text-[#a28aff]"
                        >
                          {atividade.text}
                        </Link>
                        <p className="text-xs text-[#8b90a5]">
                          {atividade.timestamp}
                        </p>
                      </div>
                    </div>
                    {atividade.xp && (
                      <span className="text-xs font-medium text-[#7c5cfc] bg-[#7c5cfc]/10 px-2 py-1 rounded-md">
                        +{atividade.xp} XP
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Habilidades' && (
          <div className="space-y-6">
            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl divide-y divide-[#252a3a]">
              {praticadas.map((hab) => (
                <div
                  key={hab.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[#e4e6ef]">{hab.nome}</p>
                    <p className="text-xs text-[#8b90a5] mt-0.5">
                      {descreverEvidencia(hab.evidencia).join(' · ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 md:justify-end">
                    <Segmentos estado={hab.estado} />
                    <EstadoHabilidade
                      estado={hab.estado}
                      className="w-28 text-center"
                    />
                  </div>
                </div>
              ))}
            </div>

            {naoPraticadas.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#e4e6ef]">
                  Ainda não praticadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {naoPraticadas.map((hab) => (
                    <Link
                      key={hab.id}
                      to={`/conceitos/${hab.id}`}
                      className="text-sm text-[#8b90a5] hover:text-[#e4e6ef] bg-[#12141f] border border-[#252a3a] hover:border-[#7c5cfc]/40 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {hab.nome}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-[#8b90a5]">
              <BarChart3 className="w-4 h-4" />
              Progresso acumulado: prática demonstrativa, checkpoints,
              exercícios guiados e respostas do último nivelamento. O
              diagnóstico da tentativa está em “Ver resultado”.
            </div>
          </div>
        )}

        {activeTab === 'Conquistas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {conquistas.map((conq) => (
              <div
                key={conq.id}
                className={`bg-[#12141f] border border-[#252a3a] rounded-xl p-5 flex items-start gap-4 ${conq.earned ? 'opacity-100' : 'opacity-60 grayscale'}`}
              >
                <div className="text-3xl bg-[#181b2a] p-3 rounded-lg border border-[#252a3a] flex-shrink-0">
                  {conq.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#e4e6ef] truncate">
                      {conq.title}
                    </h3>
                    {conq.earned ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#8b90a5] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#8b90a5] mt-1 line-clamp-2">
                    {conq.description}
                  </p>

                  {!conq.earned && conq.max && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[10px] text-[#8b90a5]">
                        <span>
                          {conq.progresso} / {conq.max}
                        </span>
                        <span>
                          {Math.round((conq.progresso / conq.max) * 100)}%
                        </span>
                      </div>
                      <div className="bg-[#181b2a] rounded-full h-1.5 w-full overflow-hidden">
                        <div
                          className="bg-[#8b90a5] h-full rounded-full"
                          style={{
                            width: `${(conq.progresso / conq.max) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Histórico' && (
          <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6 relative">
            <div className="absolute left-[39px] top-6 bottom-6 w-px bg-[#252a3a]"></div>
            <div className="space-y-6 relative">
              {historico.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#181b2a] border border-[#252a3a] flex items-center justify-center text-[#8b90a5] z-10">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 bg-[#181b2a] border border-[#252a3a] rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          to={item.destino}
                          className="text-sm font-medium text-[#e4e6ef] hover:text-[#a28aff]"
                        >
                          {item.text}
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-[#8b90a5] mt-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </div>
                      </div>
                      {item.result && (
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-md ${item.result.includes('XP') ? 'text-[#7c5cfc] bg-[#7c5cfc]/10' : 'text-emerald-400 bg-emerald-400/10'}`}
                        >
                          {item.result}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
