import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Trophy, CheckCircle2, Circle, Code2,
  Play, Send, X, ChevronRight, Timer, BarChart3, Minus
} from 'lucide-react';
import { arenas, rankingArena } from '../data/mockData';

const MOCK_CHALLENGES = [
  { id: 1, title: 'Inversão de Árvore Binária', diff: 'Média', points: 200, status: 'solved', description: 'Escreva uma função para inverter uma árvore binária dada a sua raiz.' },
  { id: 2, title: 'Caminho Mínimo em Grafo', diff: 'Difícil', points: 300, status: 'attempted', description: 'Implemente o algoritmo de Dijkstra para encontrar o caminho mais curto.' },
  { id: 3, title: 'Validar Palíndromo', diff: 'Fácil', points: 100, status: 'unstarted', description: 'Crie uma função que verifica se uma string é um palíndromo.' },
  { id: 4, title: 'Soma de Submatriz', diff: 'Média', points: 200, status: 'unstarted', description: 'Calcule a soma dos elementos de uma submatriz definida por coordenadas (r1, c1) e (r2, c2).' },
  { id: 5, title: 'Mochila Booleana', diff: 'Difícil', points: 350, status: 'unstarted', description: 'Resolva o problema clássico da mochila 0/1 com programação dinâmica.' },
];

export default function ArenaAtiva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const arena = arenas.find((item) => String(item.id) === String(id)) || arenas[0];
  const [timeLeft, setTimeLeft] = useState(5400); // 90 mins = 5400s
  const [selectedChallenge, setSelectedChallenge] = useState(MOCK_CHALLENGES[1]);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [code, setCode] = useState('function solution() {\n  // Resolva: ' + MOCK_CHALLENGES[1].title + '\n}');
  const [challenges, setChallenges] = useState(MOCK_CHALLENGES);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (c) => {
    setSelectedChallenge(c);
    setCode('function solution() {\n  // Resolva: ' + c.title + '\n}');
  };

  const handleSubmit = () => {
    setChallenges(prev => prev.map(c =>
      c.id === selectedChallenge.id ? { ...c, status: 'solved' } : c
    ));
    alert('Submissão enviada!');
  };

  const solvedCount = challenges.filter(c => c.status === 'solved').length;
  const score = challenges.filter(c => c.status === 'solved').reduce((acc, c) => acc + c.points, 0);
  const ranking = rankingArena || [
    { posicao: 1, nome: 'Ana Costa', pontos: 800, resolvidos: 4 },
    { posicao: 2, nome: 'Francisco Mendes', pontos: 650, resolvidos: 3 },
    { posicao: 3, nome: 'João Silva', pontos: 500, resolvidos: 2 },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0b0d14] text-[#e4e6ef] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-[#12141f] border-b border-[#252a3a] flex items-center justify-between px-6 flex-shrink-0 z-20">
        <div className="flex items-center w-1/3">
          <button
            onClick={() => navigate(`/arena/${id}/lobby`)}
            className="text-[#8b90a5] hover:text-[#e4e6ef] mr-4 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="font-bold truncate">{arena?.titulo || 'Arena'}</div>
          <span className="ml-3 hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded whitespace-nowrap">
            Modo competição · sem dicas
          </span>
        </div>

        <div className="flex items-center justify-center w-1/3">
          <div className={`flex items-center bg-[#181b2a] px-5 py-2 rounded-lg border shadow-lg ${timeLeft < 300 ? 'border-red-500/50 text-red-400' : 'border-[#7c5cfc]/30 text-[#7c5cfc]'}`}>
            <Clock size={20} className="mr-2" />
            <span className="font-mono text-2xl font-bold tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end w-1/3 gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#8b90a5]">Sua Pontuação</span>
            <span className="font-bold text-amber-400 text-lg">{score} pts</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#8b90a5]">Progresso</span>
            <span className="font-bold text-[#e4e6ef] text-lg">{solvedCount}/{challenges.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Sidebar - Challenges */}
        <div className="w-[280px] bg-[#12141f] border-r border-[#252a3a] flex flex-col z-10">
          <div className="p-4 border-b border-[#252a3a]">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-[#8b90a5]">Desafios da Arena</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {challenges.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className={`w-full text-left p-4 border-b border-[#252a3a] transition-colors flex items-start ${
                  selectedChallenge.id === c.id ? 'bg-[#181b2a] border-l-2 border-l-[#7c5cfc]' : 'hover:bg-[#181b2a]/50 border-l-2 border-l-transparent'
                }`}
              >
                <div className="mt-0.5 mr-3">
                  {c.status === 'solved' ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : c.status === 'attempted' ? (
                    <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-400/20" />
                  ) : (
                    <Circle size={16} className="text-[#555a6e]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate mb-1">{i + 1}. {c.title}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                      c.diff === 'Fácil' ? 'bg-emerald-500/10 text-emerald-400' :
                      c.diff === 'Média' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {c.diff}
                    </span>
                    <span className="text-xs text-[#8b90a5]">{c.points} pts</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-[#252a3a]">
            <button
              onClick={() => setShowScoreboard(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#181b2a] hover:bg-[#252a3a] border border-[#252a3a] text-[#e4e6ef] py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <BarChart3 size={16} />
              Ver Ranking Geral
            </button>
          </div>
        </div>

        {/* Center - Workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0b0d14]">
          {/* Top - Challenge Description */}
          <div className="h-[40%] bg-[#12141f] border-b border-[#252a3a] overflow-y-auto p-6 lg:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-3 text-[#e4e6ef]">{selectedChallenge.title}</h1>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                    selectedChallenge.diff === 'Fácil' ? 'bg-emerald-500/10 text-emerald-400' :
                    selectedChallenge.diff === 'Média' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    Dificuldade: {selectedChallenge.diff}
                  </span>
                  <span className="text-xs font-medium bg-[#181b2a] border border-[#252a3a] text-[#e4e6ef] px-2.5 py-1 rounded-md flex items-center">
                    <Trophy size={12} className="mr-1.5 text-amber-400" />
                    {selectedChallenge.points} Pontos
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[#8b90a5] text-sm leading-relaxed space-y-4">
              <p>{selectedChallenge.description}</p>
              <p>O código deve ser otimizado em termos de complexidade de tempo e espaço.</p>

              <div className="mt-6">
                <h3 className="text-[#e4e6ef] font-semibold mb-2 text-sm">Exemplo 1:</h3>
                <pre className="bg-[#0b0d14] border border-[#252a3a] p-4 rounded-lg text-sm font-mono text-[#e4e6ef]">
                  <span className="text-[#8b90a5]">Entrada:</span> n = 5<br/>
                  <span className="text-[#8b90a5]">Saída:</span> 120
                </pre>
              </div>
            </div>
          </div>

          {/* Bottom - Code Editor */}
          <div className="flex-1 flex flex-col relative">
            <div className="bg-[#181b2a] border-b border-[#252a3a] px-4 py-2 flex items-center justify-between text-xs text-[#8b90a5]">
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-[#7c5cfc]" />
                <span className="font-medium text-[#e4e6ef]">solution.js</span>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* Line numbers mock */}
              <div className="w-10 bg-[#0b0d14] border-r border-[#181b2a] text-[#555a6e] text-xs font-mono py-4 text-right pr-2 select-none">
                {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                className="flex-1 w-full bg-[#0b0d14] text-[#e4e6ef] p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
            </div>

            <div className="bg-[#12141f] border-t border-[#252a3a] p-4 flex justify-between items-center z-10">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#181b2a] hover:bg-[#252a3a] border border-[#252a3a] rounded-lg text-sm font-medium transition-colors">
                <Play size={16} className="text-emerald-400" />
                Testar Código
              </button>

              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-[#7c5cfc]/20"
              >
                <Send size={16} />
                Submeter Solução
              </button>
            </div>
          </div>
        </div>

        {/* Scoreboard Drawer */}
        <div className={`absolute top-0 right-0 h-full w-[350px] bg-[#12141f] border-l border-[#252a3a] transform transition-transform duration-300 z-30 shadow-2xl ${showScoreboard ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-[#252a3a] bg-[#181b2a]">
            <h2 className="font-bold flex items-center gap-2 text-[#e4e6ef]">
              <Trophy size={18} className="text-amber-400" />
              Ranking ao vivo
            </h2>
            <button
              onClick={() => setShowScoreboard(false)}
              className="p-1.5 hover:bg-[#252a3a] rounded-md text-[#8b90a5] hover:text-[#e4e6ef] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
            <div className="space-y-3">
              {ranking.map((user, idx) => {
                const isMe = user.nome === 'Francisco Mendes';
                return (
                  <div
                    key={idx}
                    className={`flex items-center p-3 rounded-lg border ${
                      isMe ? 'bg-[#7c5cfc]/10 border-[#7c5cfc]/50' : 'bg-[#181b2a] border-[#252a3a]'
                    }`}
                  >
                    <div className={`w-8 text-center font-bold text-lg ${
                      idx === 0 ? 'text-amber-400' :
                      idx === 1 ? 'text-slate-300' :
                      idx === 2 ? 'text-amber-700' : 'text-[#8b90a5]'
                    }`}>
                      {idx + 1}º
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#252a3a] mx-3 flex items-center justify-center text-sm font-bold text-[#e4e6ef]">
                      {user.nome.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate flex items-center gap-2 text-[#e4e6ef]">
                        {user.nome}
                        {isMe && <span className="text-[10px] bg-[#7c5cfc] text-white px-1.5 py-0.5 rounded-sm font-bold">Você</span>}
                      </div>
                      <div className="text-xs text-[#8b90a5] mt-0.5">{user.desafiosResolvidos ?? user.resolvidos ?? 0} resolvidos</div>
                    </div>

                    <div className="font-bold text-sm text-[#e4e6ef]">
                      {user.pontos} <span className="text-[10px] text-[#8b90a5] font-normal">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overlay for drawer */}
        {showScoreboard && (
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 transition-opacity"
            onClick={() => setShowScoreboard(false)}
          />
        )}
      </div>
    </div>
  );
}
