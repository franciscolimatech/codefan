import { useState } from 'react';
import {
  Eye,
  Code2,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  Route,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';
import {
  metricasAprendizagem,
  trilhas as trilhasMock,
  desafios as desafiosCatalogo,
} from '../data/mockData';
import { habilidadePorId } from '../data/aprendizagem';

export default function Professor() {
  const [activeTab, setActiveTab] = useState('Desafios');

  const tabs = ['Desafios', 'Aprendizagem'];
  const {
    usuario,
    progresso,
    nivelamento,
    recomendacao,
    estadoDe,
    resumoTrilha,
    dicasReveladas,
  } = useProgresso();
  const stats = {
    desafiosCriados: desafiosCatalogo.length,
    trilhas: trilhasMock.length,
    conceitos: progresso.conceitosPraticados.length,
    alunosAtivos: metricasAprendizagem.alunosAtivos,
  };
  const desafios = desafiosCatalogo.map((d) => ({
    id: d.id,
    title: d.titulo,
    category: d.categoria,
    difficulty: d.dificuldade,
    status: 'Publicado',
    submissions: d.tentativas,
    successRate: d.taxaAcerto,
  }));
  const metricas = metricasAprendizagem;
  const maiorDificuldade = metricas.habilidadesComDificuldade[0];
  const maxAjuda = Math.max(
    ...metricas.habilidadesComDificuldade.map((h) => h.pedidosDeAjuda)
  );
  const maxAlunos = Math.max(
    ...metricas.trilhasMaisUsadas.map((t) => t.alunos)
  );

  const getDifficultyStyle = (diff) => {
    switch (diff.toLowerCase()) {
      case 'fácil':
        return 'text-emerald-400 bg-emerald-400/10';
      case 'média':
      case 'médio':
        return 'text-amber-400 bg-amber-400/10';
      case 'difícil':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-[#8b90a5] bg-[#181b2a]';
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'publicado':
        return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
      case 'rascunho':
        return 'text-amber-400 bg-amber-400/10 border border-amber-400/20';
      case 'aposentado':
        return 'text-[#8b90a5] bg-[#181b2a] border border-[#252a3a]';
      default:
        return 'text-[#8b90a5] bg-[#181b2a]';
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 text-[#e4e6ef] max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e4e6ef] flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-[#7c5cfc]" />
          Prof. Ricardo Almeida
        </h1>
        <p className="text-sm text-[#8b90a5] mt-1">
          Acompanhe desafios, trilhas e aprendizagem. Dados de turma simulados;
          o aluno demonstrativo usa o mesmo progresso local da Home e do Perfil.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <Code2 className="w-5 h-5 text-[#7c5cfc]" />
            <span className="text-sm font-medium">Desafios disponíveis</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">
            {stats.desafiosCriados}
          </h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <Route className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">Trilhas disponíveis</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">{stats.trilhas}</h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium">Conceitos do aluno</span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">
            {stats.conceitos}
          </h3>
        </div>
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors">
          <div className="flex items-center gap-3 text-[#8b90a5] mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">
              Alunos ativos (simulado)
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#e4e6ef]">
            {stats.alunosAtivos}
          </h3>
        </div>
      </div>

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

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'Desafios' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#e4e6ef]">Desafios</h2>
              <span className="text-xs text-[#8b90a5]">
                Catálogo demonstrativo · criação e edição sem backend
              </span>
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#252a3a] text-xs uppercase text-[#8b90a5]">
                    <th className="p-4 font-medium">Título</th>
                    <th className="p-4 font-medium">Dificuldade</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-center">Submissões</th>
                    <th className="p-4 font-medium text-center">
                      Taxa de Acerto
                    </th>
                    <th className="p-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {desafios.map((desafio) => (
                    <tr
                      key={desafio.id}
                      className="border-b border-[#252a3a]/50 hover:bg-[#181b2a]/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-[#e4e6ef]">
                          {desafio.title}
                        </div>
                        <div className="text-xs text-[#8b90a5] mt-0.5">
                          {desafio.category}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyStyle(desafio.difficulty)}`}
                        >
                          {desafio.difficulty}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${getStatusStyle(desafio.status)}`}
                        >
                          {desafio.status}
                        </span>
                      </td>
                      <td className="p-4 text-center text-[#e4e6ef]">
                        {desafio.submissions}
                      </td>
                      <td className="p-4 text-center text-[#e4e6ef]">
                        {desafio.submissions > 0
                          ? `${desafio.successRate}%`
                          : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/desafios/${desafio.id}`}
                            className="p-1.5 text-[#8b90a5] hover:text-[#e4e6ef] hover:bg-[#252a3a] rounded transition-colors"
                            aria-label={`Visualizar ${desafio.title}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Aprendizagem' && (
          <div className="space-y-6">
            <section className="mvp-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold">
                  Aluno demonstrativo · {usuario.nome}
                </h2>
                <Link className="mvp-link" to="/perfil">
                  Ver perfil do aluno
                </Link>
              </div>
              <p className="mvp-muted">
                {nivelamento.completed
                  ? 'Nivelamento de Python concluído. Diagnóstico inicial e prática acumulada são apresentados separadamente.'
                  : `Nivelamento: ${nivelamento.answers.length} de 6 respostas registradas.`}
              </p>
              {nivelamento.completed && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {recomendacao.mapa.map((h) => (
                    <div
                      key={h.habilidadeId}
                      className="rounded-lg border border-[#252a3a] p-3 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm">
                          {habilidadePorId(h.habilidadeId)?.nome}
                        </strong>
                        <EstadoHabilidade estado={h.estado} />
                      </div>
                      <p className="text-xs text-[#8b90a5]">
                        Nivelamento: {h.resumo}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#8b90a5]">
                        Progresso acumulado:{' '}
                        <EstadoHabilidade estado={estadoDe(h.habilidadeId)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="mvp-muted">
                {progresso.desafiosResolvidos.length} desafios praticados ·{' '}
                {progresso.conceitosPraticados.length} conceitos ·{' '}
                {trilhasMock.reduce(
                  (total, t) => total + resumoTrilha(t).concluidas,
                  0
                )}{' '}
                etapas ·{' '}
                {Object.values(dicasReveladas).reduce(
                  (total, n) => total + n,
                  0
                )}{' '}
                dicas abertas
              </p>
              {nivelamento.completed && (
                <Link
                  className="mvp-link"
                  to={`/trilhas/${recomendacao.trilhaId}`}
                >
                  Trilha recomendada: Fundamentos de Python
                </Link>
              )}
            </section>
            <p className="mvp-note">
              Visão da turma abaixo: agregados fictícios para demonstrar o
              acompanhamento do professor.
            </p>
            <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
                  Maior dificuldade na turma simulada
                </p>
                <p className="text-[#e4e6ef] mt-1">
                  <strong>
                    {habilidadePorId(maiorDificuldade.habilidadeId)?.nome}
                  </strong>{' '}
                  — {maiorDificuldade.pedidosDeAjuda} alunos solicitaram ajuda
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">Alunos em trilhas</p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {metricas.alunosEmTrilhas}
                </h3>
                <p className="text-xs text-[#8b90a5] mt-1">
                  de {metricas.alunosAtivos} alunos ativos
                </p>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">
                  Etapas concluídas na semana
                </p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {metricas.etapasConcluidasSemana}
                </h3>
                <p className="text-xs text-[#8b90a5] mt-1">
                  em todas as trilhas
                </p>
              </div>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
                <p className="text-sm text-[#8b90a5] mb-2">
                  Pedidos de orientação
                </p>
                <h3 className="text-2xl font-bold text-[#e4e6ef]">
                  {metricas.pedidosDeAjudaSemana}
                </h3>
                <p className="text-xs text-[#8b90a5] mt-1">
                  "Não sei por onde começar"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-[#e4e6ef] flex items-center gap-2">
                  <Route className="w-4 h-4 text-[#7c5cfc]" />
                  Trilhas mais utilizadas
                </h3>
                {metricas.trilhasMaisUsadas.map((item) => {
                  const trilha = trilhasMock.find(
                    (t) => t.id === item.trilhaId
                  );
                  return (
                    <div key={item.trilhaId} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#e4e6ef]">{trilha?.nome}</span>
                        <span className="text-[#8b90a5]">
                          {item.alunos} alunos
                        </span>
                      </div>
                      <div className="bg-[#181b2a] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#7c5cfc] h-full rounded-full"
                          style={{
                            width: `${(item.alunos / maxAlunos) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-[#555a6e]">
                        Média de {String(item.etapasMedia).replace('.', ',')} de{' '}
                        {trilha?.etapas.length} etapas concluídas
                      </p>
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
                      <span className="text-[#e4e6ef]">
                        {habilidadePorId(item.habilidadeId)?.nome}
                      </span>
                      <span className="text-[#8b90a5]">
                        {item.pedidosDeAjuda} pedidos de ajuda
                      </span>
                    </div>
                    <div className="bg-[#181b2a] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{
                          width: `${(item.pedidosDeAjuda / maxAjuda) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
