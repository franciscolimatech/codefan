import React, { useState } from 'react';
import {
  Plus, Edit, Eye, Code2, Users, Swords, BarChart3,
  Clock, Trophy, ChevronRight, GraduationCap, TrendingUp, Lightbulb, Route
} from 'lucide-react';
import { metricasAprendizagem, trilhas as trilhasMock } from '../data/mockData';
import { habilidadePorId } from '../data/aprendizagem';

const stats = {
  desafiosCriados: 12,
  comunidades: 3,
  arenasRealizadas: 8,
  alunosAtivos: 156
};

const desafios = [
  { id: 1, title: 'Introdução a Grafos', category: 'Algoritmos', difficulty: 'Difícil', status: 'Publicado', submissions: 124, successRate: 32 },
  { id: 2, title: 'Ordenação Simples', category: 'Lógica', difficulty: 'Fácil', status: 'Publicado', submissions: 450, successRate: 85 },
  { id: 3, title: 'Busca em Profundidade', category: 'Algoritmos', difficulty: 'Média', status: 'Rascunho', submissions: 0, successRate: 0 },
  { id: 4, title: 'Árvores Binárias', category: 'Estruturas', difficulty: 'Média', status: 'Publicado', submissions: 89, successRate: 45 },
  { id: 5, title: 'Variáveis e Tipos', category: 'Fundamentos', difficulty: 'Fácil', status: 'Aposentado', submissions: 800, successRate: 92 },
];

const comunidades = [
  { id: 1, name: 'Turma A - Estruturas de Dados', members: 45, messagesToday: 12, active: true },
  { id: 2, name: 'Monitoria Algoritmos', members: 12, messagesToday: 3, active: true },
  { id: 3, name: 'Turma B - Introdução 2023', members: 38, messagesToday: 0, active: false },
];

const arenas = [
  { id: 1, name: 'Maratona Intermediária', type: 'Competitiva', date: '15/10/2026', participants: 42, status: 'Concluída' },
  { id: 2, name: 'Desafio Semanal - Grafos', type: 'Prática', date: '22/10/2026', participants: 18, status: 'Em andamento' },
  { id: 3, name: 'Torneio de Fim de Semestre', type: 'Competitiva', date: '30/11/2026', participants: 0, status: 'Agendada' },
];

export default function Professor() {
  const [activeTab, setActiveTab] = useState('Meus Desafios');

  const tabs = ['Meus Desafios', 'Comunidades', 'Arenas', 'Aprendizagem'];
  const metricas = metricasAprendizagem;
  const maiorDificuldade = metricas.habilidadesComDificuldade[0];
  const maxAjuda = Math.max(...metricas.habilidadesComDificuldade.map((h) => h.pedidosDeAjuda));
  const maxAlunos = Math.max(...metricas.trilhasMaisUsadas.map((t) => t.alunos));

  const getDifficultyStyle = (diff) => {
    switch (diff.toLowerCase()) {
      case 'fácil': return 'text-emerald-400 bg-emerald-400/10';
      case 'média': return 'text-amber-400 bg-amber-400/10';
      case 'difícil': return 'text-red-400 bg-red-400/10';
      default: return 'text-[#8b90a5] bg-[#181b2a]';
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'publicado': return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
      case 'rascunho': return 'text-amber-400 bg-amber-400/10 border border-amber-400/20';
      case 'aposentado': return 'text-[#8b90a5] bg-[#181b2a] border border-[#252a3a]';
      default: return 'text-[#8b90a5] bg-[#181b2a]';
    }
  };

  return (
    <div className="min-h-screen p-8 text-[#e4e6ef] max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e4e6ef] flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-[#7c5cfc]" />
          Prof. Ricardo Almeida
        </h1>
        <p className="text-sm text-[#8b90a5] mt-1">Gerencie seus desafios, comunidades e arenas</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <Code2 className="w-5 h-5 text-[#7c5cfc]" />
            <span className="text-sm font-medium">Desafios criados</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">{stats.desafiosCriados}</h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">Comunidades</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">{stats.comunidades}</h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <Swords className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium">Arenas realizadas</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">{stats.arenasRealizadas}</h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">Alunos ativos</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">{stats.alunosAtivos}</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#252a3a] overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc]' : 'text-[#8b90a5] hover:text-[#e4e6ef]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'Meus Desafios' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#e4e6ef]">Desafios</h2>
              <button className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Criar Desafio
              </button>
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#252a3a] text-xs uppercase text-[#8b90a5]">
                    <th className="p-4 font-medium">Título</th>
                    <th className="p-4 font-medium">Dificuldade</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-center">Submissões</th>
                    <th className="p-4 font-medium text-center">Taxa de Acerto</th>
                    <th className="p-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {desafios.map(desafio => (
                    <tr key={desafio.id} className="border-b border-[#252a3a]/50 hover:bg-[#181b2a]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-[#e4e6ef]">{desafio.title}</div>
                        <div className="text-xs text-[#8b90a5] mt-0.5">{desafio.category}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyStyle(desafio.difficulty)}`}>
                          {desafio.difficulty}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${getStatusStyle(desafio.status)}`}>
                          {desafio.status}
                        </span>
                      </td>
                      <td className="p-4 text-center text-[#e4e6ef]">{desafio.submissions}</td>
                      <td className="p-4 text-center text-[#e4e6ef]">
                        {desafio.submissions > 0 ? `${desafio.successRate}%` : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-[#8b90a5] hover:text-[#7c5cfc] hover:bg-[#7c5cfc]/10 rounded transition-colors" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#252a3a] rounded transition-colors" title="Visualizar">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Comunidades' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#e4e6ef]">Minhas Comunidades</h2>
              <button className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Criar Comunidade
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {comunidades.map(com => (
                <div key={com.id} className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#181b2a] border border-[#252a3a] flex items-center justify-center text-[#7c5cfc]">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${com.active ? 'text-emerald-400 bg-emerald-400/10' : 'text-[#8b90a5] bg-[#181b2a]'}`}>
                      {com.active ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#e4e6ef] mb-3 truncate">{com.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#8b90a5]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {com.members} alunos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                      {com.messagesToday} msgs hoje
                    </span>
                  </div>
                  <button className="mt-5 w-full bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] py-2 rounded-lg text-sm font-medium transition-colors">
                    Gerenciar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Aprendizagem' && (
          <div className="space-y-6">
            <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400">Maior dificuldade esta semana</p>
                <p className="text-[#e4e6ef] mt-1">
                  <strong>{habilidadePorId(maiorDificuldade.habilidadeId)?.nome}</strong> — {maiorDificuldade.pedidosDeAjuda} alunos solicitaram ajuda
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">Alunos em trilhas</p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">{metricas.alunosEmTrilhas}</h3>
                <p className="text-xs text-[#8b90a5] mt-1">de {metricas.alunosAtivos} alunos ativos</p>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">Etapas concluídas na semana</p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">{metricas.etapasConcluidasSemana}</h3>
                <p className="text-xs text-[#8b90a5] mt-1">em todas as trilhas</p>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">Pedidos de orientação</p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">{metricas.pedidosDeAjudaSemana}</h3>
                <p className="text-xs text-[#8b90a5] mt-1">"Não sei por onde começar"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-[#e4e6ef] flex items-center gap-2">
                  <Route className="w-4 h-4 text-[#7c5cfc]" />
                  Trilhas mais utilizadas
                </h3>
                {metricas.trilhasMaisUsadas.map((item) => {
                  const trilha = trilhasMock.find((t) => t.id === item.trilhaId);
                  return (
                    <div key={item.trilhaId} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#e4e6ef]">{trilha?.nome}</span>
                        <span className="text-[#8b90a5]">{item.alunos} alunos</span>
                      </div>
                      <div className="bg-[#181b2a] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#7c5cfc] h-full rounded-full" style={{ width: `${(item.alunos / maxAlunos) * 100}%` }} />
                      </div>
                      <p className="text-xs text-[#555a6e]">Média de {String(item.etapasMedia).replace('.', ',')} de {trilha?.etapas.length} etapas concluídas</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-[#e4e6ef] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Habilidades com maior dificuldade
                </h3>
                {metricas.habilidadesComDificuldade.map((item) => (
                  <div key={item.habilidadeId} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#e4e6ef]">{habilidadePorId(item.habilidadeId)?.nome}</span>
                      <span className="text-[#8b90a5]">{item.pedidosDeAjuda} pedidos de ajuda</span>
                    </div>
                    <div className="bg-[#181b2a] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(item.pedidosDeAjuda / maxAjuda) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Arenas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#e4e6ef]">Arenas Gerenciadas</h2>
              <button className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Criar Arena
              </button>
            </div>

            <div className="space-y-4">
              {arenas.map(arena => (
                <div key={arena.id} className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#7c5cfc]/40 transition-colors">
                  <div className="flex items-start md:items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#181b2a] border border-[#252a3a] flex items-center justify-center text-amber-400 flex-shrink-0">
                      <Swords className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#e4e6ef]">{arena.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#8b90a5]">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" />
                          {arena.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {arena.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {arena.participants} participantes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:flex-col md:items-end">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                      arena.status === 'Concluída' ? 'text-[#8b90a5] bg-[#181b2a]' :
                      arena.status === 'Em andamento' ? 'text-emerald-400 bg-emerald-400/10' :
                      'text-amber-400 bg-amber-400/10'
                    }`}>
                      {arena.status}
                    </span>
                    <button className="text-sm font-medium text-[#7c5cfc] hover:text-[#e4e6ef] flex items-center gap-1 transition-colors">
                      Detalhes
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
