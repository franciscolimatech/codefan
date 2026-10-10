import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Send, Clock, ChevronDown, Terminal, Eye, EyeOff, CheckCircle2, XCircle, FileCode, X, Loader2, Compass, GraduationCap } from 'lucide-react';
import { getDesafio } from '../data/mockData';
import { habilidadePorId } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import OrientacaoDesafio from '../components/aprendizagem/OrientacaoDesafio';
import DicasProgressivas from '../components/aprendizagem/DicasProgressivas';

const LINGUAGENS = { Python: 'python', Java: 'java', JavaScript: 'javascript' };
const EXTENSOES = { javascript: 'js', python: 'py', java: 'java' };

export default function Resolver() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { rascunhos, salvarRascunho, registrarDesafio } = useProgresso();

  const source = getDesafio(id);
  const details = {
    ...source,
    title: source.titulo,
    difficulty: source.dificuldade,
    description: source.descricao,
    testesVisiveis: (source.testes || []).filter(t => t.visivel),
    testesOcultos: (source.testes || []).filter(t => !t.visivel).length,
  };
  const [activeTab, setActiveTab] = useState(params.get('aba') === 'dicas' ? 'Dicas' : 'Enunciado');
  const [orientacaoAberta, setOrientacaoAberta] = useState(false);
  const [code, setCode] = useState(rascunhos[details.id] ?? (details.codigoInicial || '// Escreva seu código aqui\n'));
  const [output, setOutput] = useState('');
  const [isOutputOpen, setIsOutputOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState(LINGUAGENS[(details.linguagens || [])[0]] || 'javascript');
  const aprendeu = habilidadePorId(params.get('aprendeu'));

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error'

  // Timer state
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleRun = () => {
    setIsRunning(true);
    setIsOutputOpen(true);
    setOutput('Preparando demonstração de execução...');

    setTimeout(() => {
      setOutput('> Execução simulada: nenhum código foi executado.\n> Os casos de teste acima são exemplos para orientar sua solução.\n> O Judge real ainda não está integrado.');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);

    setTimeout(() => {
      setIsRunning(false);
      // Apenas registra prática demonstrativa; não avalia a solução.
      const isSuccess = Boolean(code.trim()) && code.trim() !== (details.codigoInicial || '// Escreva seu código aqui\n').trim();
      if (isSuccess) registrarDesafio(details.id);
      setSubmissionStatus(isSuccess ? 'success' : 'error');
      setShowModal(true);
    }, 2000);
  };

  // Generate line numbers
  const lineCount = code.split('\n').length;
  const lines = Array.from({ length: Math.max(10, lineCount) }, (_, i) => i + 1);

  return (
    <div className="h-screen flex flex-col bg-[#0b0d14] overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="min-h-14 bg-[#12141f] border-b border-[#252a3a] flex flex-wrap items-center justify-between gap-3 px-4 py-2 shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/desafios/${details.id || 'd2'}`} className="text-[#8b90a5] hover:text-[#e4e6ef] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-[#252a3a]"></div>
          <h1 className="text-[#e4e6ef] font-medium text-sm flex items-center gap-3">
            {details.title || 'Desafio de Código'}
            <span className="text-amber-400 bg-amber-400/10 text-xs px-2 py-0.5 rounded-full font-medium">
              {details.difficulty || 'Médio'}
            </span>
            <span className="flex items-center gap-1.5 text-[#8b90a5] bg-[#181b2a] border border-[#252a3a] text-xs px-2 py-0.5 rounded-full font-medium">
              <GraduationCap className="w-3 h-3" />
              Simulação de treinamento
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#8b90a5] text-sm bg-[#181b2a] px-3 py-1.5 rounded-md border border-[#252a3a]">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(seconds)}</span>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 text-emerald-400" />}
            Simular execução
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            Simular submissão
          </button>
        </div>
      </header>

      <p className="px-4 py-2 text-xs text-amber-300 bg-amber-400/5 border-b border-[#252a3a]">Judge demonstrativo: execução e correção simuladas. A submissão registra prática local, sem validar o código.</p>
      {/* Main Split Area */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-full md:w-[40%] min-h-80 md:min-h-0 flex flex-col shrink-0 border-r border-[#252a3a] bg-[#12141f]">
          <div className="flex border-b border-[#252a3a]">
            {['Enunciado', 'Testes', 'Dicas'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-[#7c5cfc] border-[#7c5cfc]' : 'text-[#8b90a5] border-transparent hover:text-[#e4e6ef]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {aprendeu && (
            <div className="flex items-start justify-between gap-3 px-6 py-3 bg-emerald-400/5 border-b border-emerald-400/30">
              <p className="text-sm text-[#e4e6ef]">
                <strong>{aprendeu.nome}</strong> agora está no seu progresso. Releia o enunciado com isso em mente.
              </p>
              <button onClick={() => setParams({})} className="text-[#8b90a5] hover:text-[#e4e6ef] flex-shrink-0" aria-label="Fechar aviso">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#252a3a]">
            <span className="text-xs text-[#8b90a5]">Travado? Sem problema.</span>
            <button
              onClick={() => setOrientacaoAberta(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#7c5cfc] hover:text-[#e4e6ef] border border-[#7c5cfc]/30 hover:bg-[#7c5cfc]/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              Não sei por onde começar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {activeTab === 'Enunciado' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#e4e6ef] mb-2">{details.title || 'Desafio'}</h2>
                  <div className="prose prose-invert prose-sm max-w-none text-[#8b90a5]">
                    <div className="whitespace-pre-line">{details.description || 'Descrição do desafio.'}</div>
                  </div>
                </div>

                {details.descricao?.exemplos?.map((ex, idx) => (
                  <div key={idx} className="bg-[#181b2a] border border-[#252a3a] rounded-lg overflow-hidden">
                    <div className="bg-[#252a3a]/50 px-4 py-2 border-b border-[#252a3a] text-xs font-medium text-[#e4e6ef]">
                      Exemplo {idx + 1}
                    </div>
                    <div className="p-4 space-y-3 font-mono text-sm">
                      <div>
                        <div className="text-[#5b8def] text-xs mb-1">Entrada:</div>
                        <div className="text-[#e4e6ef]">{ex.input}</div>
                      </div>
                      <div>
                        <div className="text-[#5b8def] text-xs mb-1">Saída:</div>
                        <div className="text-[#e4e6ef]">{ex.output}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Testes' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#e4e6ef] mb-3">Casos de Teste</h3>
                {(details.testesVisiveis || [{nome: 'Teste de exemplo 1'}]).map((t, idx) => (
                  <div key={idx} className="bg-[#181b2a] border border-[#252a3a] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-[#5b8def]" />
                      <span className="text-[#e4e6ef] text-sm font-medium">{t.nome}</span>
                    </div>
                  </div>
                ))}

                <div className="border border-dashed border-[#252a3a] bg-[#0b0d14] p-4 rounded-lg flex items-center justify-center gap-3 opacity-60">
                  <EyeOff className="w-5 h-5 text-[#8b90a5]" />
                  <span className="text-sm text-[#8b90a5]">{details.testesOcultos ?? 0} Casos de teste ocultos</span>
                </div>
              </div>
            )}

            {activeTab === 'Dicas' && (
              <DicasProgressivas
                desafioId={details.id}
                origem="resolver"
                onAbrirOrientacao={() => setOrientacaoAberta(true)}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANEL - EDITOR & TERMINAL */}
        <div className="w-full md:w-[60%] min-h-[480px] md:min-h-0 flex flex-col shrink-0 bg-[#0d1117]">
          {/* Editor Header */}
          <div className="h-10 bg-[#12141f] border-b border-[#252a3a] flex items-center justify-between px-2 shrink-0">
            <div className="flex items-center h-full">
              <div className="flex items-center gap-2 bg-[#0d1117] h-full px-4 border-t-2 border-[#7c5cfc] text-[#e4e6ef] text-sm">
                <FileCode className="w-4 h-4 text-[#5b8def]" />
                {`solution.${EXTENSOES[language] || 'js'}`}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-[#181b2a] border border-[#252a3a] text-[#e4e6ef] text-xs rounded pl-3 pr-8 py-1 focus:outline-none focus:border-[#7c5cfc]"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <ChevronDown className="absolute right-2 top-1.5 w-3 h-3 text-[#8b90a5] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex overflow-hidden bg-[#0d1117] relative">
            <div className="w-12 bg-[#12141f] border-r border-[#252a3a] flex flex-col py-4 shrink-0 text-right pr-2">
              {lines.map(n => (
                <div key={n} className="text-xs text-[#555a6e] font-mono leading-6">{n}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                salvarRascunho(details.id, e.target.value);
              }}
              aria-label="Editor de código"
              spellCheck="false"
              className="flex-1 w-full h-full bg-transparent text-[#e4e6ef] font-mono text-sm p-4 leading-6 resize-none focus:outline-none whitespace-pre"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Console / Output */}
          <div className={`border-t border-[#252a3a] bg-[#12141f] flex flex-col transition-all duration-300 ${isOutputOpen ? 'h-48' : 'h-10'}`}>
            <div
              className="h-10 flex items-center justify-between px-4 cursor-pointer hover:bg-[#181b2a] shrink-0"
              onClick={() => setIsOutputOpen(!isOutputOpen)}
            >
              <div className="flex items-center gap-2 text-sm text-[#e4e6ef] font-medium">
                <Terminal className="w-4 h-4 text-[#8b90a5]" />
                Console
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8b90a5] transition-transform ${isOutputOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOutputOpen && (
              <div className="flex-1 p-4 overflow-y-auto bg-[#0b0d14] font-mono text-sm text-[#a3a8b8] whitespace-pre-wrap">
                {output || 'Nenhuma execução recente. Use "Simular execução" para conhecer o fluxo demonstrativo.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#8b90a5] hover:text-[#e4e6ef]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {submissionStatus === 'success' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#e4e6ef] mb-2">Prática demonstrativa registrada</h2>
                  <p className="text-[#8b90a5] mb-6">Seu rascunho foi registrado nesta demonstração. O código não foi executado nem corrigido.</p>

                  <p className="text-sm text-[#8b90a5] mb-6">Recompensa demonstrativa: {details.xp || 0} XP, concedidos uma única vez por desafio.</p>

                  {(details.habilidades || []).length > 0 && (
                    <p className="text-xs text-[#8b90a5] mb-6 -mt-2">
                      Habilidades registradas: {details.habilidades.map((h) => habilidadePorId(h)?.nome).join(', ')}
                    </p>
                  )}

                  <Link to="/desafios" className="w-full">
                    <button className="w-full bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium py-3 rounded-lg transition-colors">
                      Voltar para Desafios
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                    <XCircle className="w-10 h-10 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#e4e6ef] mb-2">Rascunho ainda não alterado</h2>
                  <p className="text-[#8b90a5] mb-6">Escreva ou altere seu rascunho para registrar a prática demonstrativa. Não avaliamos se a solução está correta.</p>

                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] font-medium py-3 rounded-lg transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {orientacaoAberta && (
        <OrientacaoDesafio
          desafioId={details.id}
          origem="resolver"
          onClose={() => setOrientacaoAberta(false)}
          onContinuar={() => setOrientacaoAberta(false)}
          onVerDica={() => {
            setOrientacaoAberta(false);
            setActiveTab('Dicas');
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #252a3a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b425b;
        }
      `}} />
    </div>
  );
}
