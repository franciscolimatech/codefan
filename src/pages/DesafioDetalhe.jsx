import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Eye, EyeOff, User, BarChart3, Code2, Tag, Zap, Clock, CheckCircle2, Compass, GraduationCap, Route, Circle, X } from 'lucide-react';
import { getDesafio, trilhasDoDesafio } from '../data/mockData';
import { habilidadePorId } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';
import OrientacaoDesafio from '../components/aprendizagem/OrientacaoDesafio';

export default function DesafioDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { estadoDe } = useProgresso();
  const [orientacaoAberta, setOrientacaoAberta] = useState(false);

  // Find challenge details (lista + detalhes extras do mock)
  const source = getDesafio(id);
  const visibleTests = (source.testes || []).filter(t => t.visivel);
  const hiddenTests = (source.testes || []).filter(t => !t.visivel).length;
  const details = {
    ...source,
    title: source.titulo,
    category: source.categoria,
    difficulty: source.dificuldade,
    description: source.descricao,
    author: source.autor,
    attempts: source.tentativas,
    successRate: source.taxaAcerto,
    languages: source.linguagens,
    testesVisiveis: visibleTests,
    testesOcultos: hiddenTests,
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Fácil') return 'text-emerald-400 bg-emerald-400/10';
    if (diff === 'Médio') return 'text-amber-400 bg-amber-400/10';
    if (diff === 'Difícil') return 'text-red-400 bg-red-400/10';
    return 'text-gray-400 bg-gray-400/10';
  };

  const aprendeu = habilidadePorId(params.get('aprendeu'));
  const trilhasRelacionadas = trilhasDoDesafio(source.id);
  const idDesafio = source.id || id;

  return (
    <div className="min-h-screen bg-[#0b0d14] p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link to="/desafios" className="inline-flex items-center text-sm text-[#8b90a5] hover:text-[#e4e6ef] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para desafios
        </Link>

        {aprendeu && (
          <div className="flex items-start justify-between gap-4 bg-emerald-400/5 border border-emerald-400/30 rounded-xl p-4">
            <div className="text-sm">
              <p className="text-[#e4e6ef] font-medium">Boa! {aprendeu.nome} agora está no seu progresso.</p>
              <p className="text-[#8b90a5] mt-0.5">Releia o enunciado com esse conhecimento em mente. Se precisar, há dicas no modo de resolução.</p>
            </div>
            <button onClick={() => setParams({})} className="text-[#8b90a5] hover:text-[#e4e6ef]" aria-label="Fechar aviso">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - LEFT */}
          <div className="w-full md:w-[65%] space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-[#e4e6ef]">{details.title || 'Desafio de Código'}</h1>
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#8b90a5] bg-[#181b2a] border border-[#252a3a] px-2.5 py-1 rounded-full">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Treinamento
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-[#7c5cfc]/10 text-[#7c5cfc] text-xs font-medium px-3 py-1.5 rounded-full">
                  {details.category || 'Categoria'}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getDifficultyColor(details.difficulty)}`}>
                  {details.difficulty || 'Dificuldade'}
                </span>
                <span className="flex items-center gap-1 text-[#7c5cfc] bg-[#7c5cfc]/10 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  {details.xp || 0} XP
                </span>
                <span className="flex items-center gap-1 text-[#8b90a5] text-xs">
                  <User className="w-3.5 h-3.5" />
                  Por: {details.author || 'Prof. Silva'}
                </span>
              </div>

              {details.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <Tag className="w-4 h-4 text-[#8b90a5]" />
                  {details.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-[#e4e6ef]">O que este desafio pratica</h2>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8b90a5]">Habilidades praticadas</p>
                <div className="flex flex-wrap gap-2">
                  {(source.habilidades || []).map((hid) => (
                    <span key={hid} className="flex items-center gap-2 text-sm text-[#e4e6ef] bg-[#181b2a] border border-[#252a3a] px-3 py-1.5 rounded-lg">
                      {habilidadePorId(hid)?.nome}
                      <EstadoHabilidade estado={estadoDe(hid)} />
                    </span>
                  ))}
                </div>
              </div>

              {(source.prerequisitos || []).length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8b90a5]">Pré-requisitos recomendados</p>
                  <ul className="flex flex-wrap gap-2">
                    {source.prerequisitos.map((hid) => {
                      const praticado = estadoDe(hid) !== 'nao_praticado';
                      return (
                        <li key={hid} className="flex items-center gap-1.5 text-sm text-[#e4e6ef] bg-[#181b2a] border border-[#252a3a] px-3 py-1.5 rounded-lg">
                          {praticado ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-amber-400" />}
                          {habilidadePorId(hid)?.nome}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-xs text-[#555a6e]">Recomendados, não obrigatórios. Você pode abrir o desafio quando quiser.</p>
                </div>
              )}

              {trilhasRelacionadas.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8b90a5]">Faz parte das trilhas</p>
                  <div className="flex flex-wrap gap-2">
                    {trilhasRelacionadas.map(({ trilha, etapa }) => (
                      <Link
                        key={trilha.id}
                        to={`/trilhas/${trilha.id}`}
                        className="flex items-center gap-2 text-sm text-[#e4e6ef] bg-[#7c5cfc]/10 hover:bg-[#7c5cfc]/20 border border-[#7c5cfc]/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Route className="w-4 h-4 text-[#7c5cfc]" />
                        {trilha.nome}
                        <span className="text-xs text-[#8b90a5]">· {etapa.titulo}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#e4e6ef] mb-4">Descrição</h2>
              <div className="text-sm text-[#8b90a5] space-y-4">
                <div className="whitespace-pre-line">{details.description}</div>

                {details.descricao?.exemplos && (
                  <div className="space-y-4 mt-6">
                    {details.descricao.exemplos.map((ex, idx) => (
                      <div key={idx} className="bg-[#181b2a] border border-[#252a3a] rounded-lg p-4">
                        <p className="text-[#e4e6ef] font-medium mb-2">Exemplo {idx + 1}:</p>
                        <div className="space-y-2 font-mono text-xs">
                          <div><span className="text-[#5b8def]">Input:</span> <span className="text-[#8b90a5]">{ex.input}</span></div>
                          <div><span className="text-[#5b8def]">Output:</span> <span className="text-[#8b90a5]">{ex.output}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {details.descricao?.notas && (
                  <div className="mt-6 p-4 border-l-2 border-[#7c5cfc] bg-[#7c5cfc]/5 text-[#e4e6ef] text-sm">
                    <strong>Nota:</strong> {details.descricao.notas}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - RIGHT */}
          <div className="w-full md:w-[35%] space-y-5">
            <Link to={`/resolver/${idDesafio}`} className="block">
              <button className="w-full flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-4 py-3 rounded-lg transition-colors">
                <Play className="w-5 h-5" />
                Resolver Desafio
              </button>
            </Link>

            <button
              onClick={() => setOrientacaoAberta(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] hover:border-[#7c5cfc]/40 font-medium px-4 py-3 rounded-lg transition-colors"
            >
              <Compass className="w-5 h-5 text-[#7c5cfc]" />
              Não sei por onde começar
            </button>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#e4e6ef] mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#7c5cfc]" />
                Estatísticas
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-[#252a3a] pb-2">
                  <span className="text-[#8b90a5]">Tentativas</span>
                  <span className="text-[#e4e6ef] font-medium">{details.attempts || 0}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#252a3a] pb-2">
                  <span className="text-[#8b90a5]">Taxa de Acerto</span>
                  <span className="text-emerald-400 font-medium">{details.successRate || 0}%</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[#8b90a5]">Linguagens</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {(details.languages || []).map(l => (
                      <span key={l} className="text-xs bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] px-1.5 py-0.5 rounded">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#e4e6ef] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7c5cfc]" />
                Testes
              </h3>
              <ul className="space-y-2 mb-4">
                {(details.testesVisiveis || []).map((t, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#8b90a5]">
                    <Eye className="w-4 h-4 text-[#5b8def]" />
                    <span>{t.nome}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-xs text-[#8b90a5] bg-[#181b2a] p-3 rounded-lg border border-[#252a3a]">
                <EyeOff className="w-4 h-4 shrink-0" />
                <p>Este desafio possui <strong>{details.testesOcultos || 3} testes ocultos</strong> que serão avaliados na submissão.</p>
              </div>
            </div>

            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-lg font-bold">
                {(details.author || 'P')[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-[#e4e6ef]">{details.author || 'Prof. Silva'}</p>
                <p className="text-xs text-[#8b90a5]">Autor do Desafio</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {orientacaoAberta && (
        <OrientacaoDesafio
          desafioId={idDesafio}
          origem="detalhe"
          onClose={() => setOrientacaoAberta(false)}
          onContinuar={() => navigate(`/resolver/${idDesafio}`)}
          onVerDica={() => navigate(`/resolver/${idDesafio}?aba=dicas`)}
        />
      )}
    </div>
  );
}
