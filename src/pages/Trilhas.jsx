import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Route, ArrowRight, Clock } from 'lucide-react';
import { trilhas } from '../data/mockData';
import { habilidadePorId, destinoEtapa } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';

const NIVEIS = ['Todos', 'Iniciante', 'Intermediário'];

function ChipsHabilidades({ ids, max = 4 }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.slice(0, max).map((id) => (
        <span key={id} className="text-xs bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] px-2 py-0.5 rounded">
          {habilidadePorId(id)?.nome}
        </span>
      ))}
      {ids.length > max && <span className="text-xs text-[#555a6e] py-0.5">+{ids.length - max}</span>}
    </div>
  );
}

function LinhaTrilha({ trilha, resumo }) {
  return (
    <Link
      to={`/trilhas/${trilha.id}`}
      className="flex flex-col md:flex-row md:items-center gap-4 bg-[#12141f] border border-[#252a3a] hover:border-[#7c5cfc]/40 rounded-xl p-5 transition-colors"
    >
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[#e4e6ef] font-semibold">{trilha.nome}</h3>
          <span className="text-xs text-[#8b90a5] bg-[#181b2a] border border-[#252a3a] px-2 py-0.5 rounded-full">{trilha.nivel}</span>
          <span className="flex items-center gap-1 text-xs text-[#555a6e]">
            <Clock className="w-3 h-3" />
            {trilha.duracao}
          </span>
        </div>
        <p className="text-sm text-[#8b90a5]">{trilha.descricao}</p>
        <ChipsHabilidades ids={trilha.habilidades} />
      </div>

      <div className="md:w-56 flex-shrink-0 space-y-2">
        {resumo.iniciada ? (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-[#8b90a5]">{resumo.concluidas} de {resumo.total} etapas</span>
              {resumo.etapaAtual && <span className="text-[#e4e6ef] truncate ml-2">{resumo.etapaAtual.titulo}</span>}
            </div>
            <div className="bg-[#181b2a] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#7c5cfc] h-full rounded-full" style={{ width: `${(resumo.concluidas / resumo.total) * 100}%` }} />
            </div>
          </>
        ) : (
          <p className="text-xs text-[#8b90a5]">{resumo.total} etapas · ainda não iniciada</p>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-[#7c5cfc]">
          {resumo.iniciada ? 'Abrir trilha' : 'Conhecer trilha'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Trilhas() {
  const { resumoTrilha, progresso } = useProgresso();
  const [nivel, setNivel] = useState('Todos');

  const destaque = trilhas.find((t) => t.id === progresso.ultimaTrilha) || trilhas[0];
  const resumoDestaque = resumoTrilha(destaque);

  const filtradas = trilhas.filter((t) => t.id !== destaque.id && (nivel === 'Todos' || t.nivel === nivel));
  const emAndamento = filtradas.filter((t) => resumoTrilha(t).iniciada);
  const novas = filtradas.filter((t) => !resumoTrilha(t).iniciada);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#e4e6ef] flex items-center gap-3">
          <Route className="w-7 h-7 text-[#7c5cfc]" />
          Trilhas
        </h1>
        <p className="text-sm text-[#8b90a5] mt-1">Caminhos sugeridos para aprender em ordem. Você continua livre para abrir qualquer desafio.</p>
      </div>

      {/* Continue de onde parou */}
      <section className="bg-gradient-to-r from-[#12141f] to-[#181b2a] border border-[#7c5cfc]/30 rounded-xl p-6 space-y-4">
        <p className="text-xs font-medium uppercase tracking-wider text-[#7c5cfc]">Continue de onde parou</p>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-[#e4e6ef]">{destaque.nome}</h2>
            {resumoDestaque.etapaAtual ? (
              <p className="text-sm text-[#8b90a5]">
                Etapa {resumoDestaque.indiceAtual + 1} de {resumoDestaque.total} · <span className="text-[#e4e6ef]">{resumoDestaque.etapaAtual.titulo}</span>
              </p>
            ) : (
              <p className="text-sm text-emerald-400">Trilha concluída</p>
            )}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-48 bg-[#0b0d14] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#7c5cfc] h-full rounded-full" style={{ width: `${(resumoDestaque.concluidas / resumoDestaque.total) * 100}%` }} />
              </div>
              <span className="text-xs text-[#8b90a5]">{resumoDestaque.concluidas} de {resumoDestaque.total} concluídas</span>
            </div>
          </div>
          <div className="flex gap-3">
            {resumoDestaque.etapaAtual && (
              <Link
                to={destinoEtapa(destaque, resumoDestaque.etapaAtual)}
                className="flex items-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#7c5cfc]/20"
              >
                Continuar trilha
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              to={`/trilhas/${destaque.id}`}
              className="flex items-center bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Ver trilha
            </Link>
          </div>
        </div>
      </section>

      {/* Filtro por nível */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#8b90a5] mr-1">Nível:</span>
        {NIVEIS.map((n) => (
          <button
            key={n}
            onClick={() => setNivel(n)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${nivel === n ? 'bg-[#7c5cfc] text-white' : 'bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] hover:bg-[#252a3a]'}`}
          >
            {n}
          </button>
        ))}
      </div>

      {emAndamento.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#e4e6ef]">Outras trilhas em andamento</h2>
          {emAndamento.map((t) => <LinhaTrilha key={t.id} trilha={t} resumo={resumoTrilha(t)} />)}
        </section>
      )}

      {novas.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[#e4e6ef]">Para explorar</h2>
          {novas.map((t) => <LinhaTrilha key={t.id} trilha={t} resumo={resumoTrilha(t)} />)}
        </section>
      )}

      {emAndamento.length === 0 && novas.length === 0 && (
        <p className="text-sm text-[#8b90a5]">Nenhuma outra trilha para este nível.</p>
      )}
    </div>
  );
}
