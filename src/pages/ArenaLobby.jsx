import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Users, Code2, Swords, Shield,
  Calendar, CheckCircle2, Trophy, Timer, User
} from 'lucide-react';
import { arenas } from '../data/mockData';

export default function ArenaLobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const arena = arenas?.find(a => a.id === id) || arenas?.[0] || {
    id: 'a1',
    titulo: 'Torneio de Algoritmos UFRJ',
    tipo: 'verificada',
    categoria: 'Algoritmos',
    descricao: 'Competição oficial valendo pontos para a disciplina de Estrutura de Dados.',
    inicio: new Date(Date.now() + 86400000).toISOString(),
    duracao: 90,
    participantes: 145,
    desafiosCount: 5,
    inscrito: true,
    professor: 'Dr. Roberto Souza'
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(arena.inicio) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setStarted(false);
      } else {
        setStarted(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [arena.inicio]);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-[#7c5cfc] bg-[#7c5cfc]/10 w-20 h-24 flex items-center justify-center rounded-xl border border-[#7c5cfc]/20">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-[#8b90a5] mt-3 uppercase tracking-wider font-medium">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0d14] p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/arena" className="inline-flex items-center text-[#8b90a5] hover:text-[#e4e6ef] mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Arenas
        </Link>

        <div className="bg-[#12141f] border border-[#252a3a] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7c5cfc]/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-center items-center gap-3 mb-6">
              {arena.tipo === 'verificada' && (
                <span className="bg-amber-400/10 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  Verificada
                </span>
              )}
              {arena.tipo === 'comunidade' && (
                <span className="bg-emerald-400/10 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full">
                  {arena.comunidade || 'Comunidade'}
                </span>
              )}
              {arena.tipo === 'aberta' && (
                <span className="bg-[#5b8def]/10 text-[#5b8def] text-xs font-medium px-3 py-1.5 rounded-full">
                  Aberta
                </span>
              )}
              <span className="bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] text-xs font-medium px-3 py-1.5 rounded-full">
                {arena.categoria}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#e4e6ef] mb-4">{arena.titulo}</h1>
            <p className="text-[#8b90a5] mb-10 max-w-xl mx-auto leading-relaxed">
              {arena.descricao}
            </p>

            {!started ? (
              <div className="flex justify-center gap-4 md:gap-6 mb-12">
                <TimeBlock value={timeLeft.days} label="Dias" />
                <div className="text-3xl text-[#252a3a] font-bold mt-6">:</div>
                <TimeBlock value={timeLeft.hours} label="Horas" />
                <div className="text-3xl text-[#252a3a] font-bold mt-6">:</div>
                <TimeBlock value={timeLeft.minutes} label="Min" />
                <div className="text-3xl text-[#252a3a] font-bold mt-6">:</div>
                <TimeBlock value={timeLeft.seconds} label="Seg" />
              </div>
            ) : (
              <div className="mb-12">
                <div className="inline-block bg-emerald-400/10 text-emerald-400 px-6 py-3 rounded-xl border border-emerald-400/20 text-xl font-bold">
                  A arena já começou!
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#181b2a] p-6 rounded-xl border border-[#252a3a] mb-10">
              <div className="flex flex-col items-center">
                <Timer size={20} className="text-[#5b8def] mb-2" />
                <span className="text-[#e4e6ef] font-medium">{arena.duracao} min</span>
                <span className="text-xs text-[#8b90a5]">Duração</span>
              </div>
              <div className="flex flex-col items-center">
                <Code2 size={20} className="text-emerald-400 mb-2" />
                <span className="text-[#e4e6ef] font-medium">{arena.desafios}</span>
                <span className="text-xs text-[#8b90a5]">Desafios</span>
              </div>
              <div className="flex flex-col items-center">
                <Users size={20} className="text-[#7c5cfc] mb-2" />
                <span className="text-[#e4e6ef] font-medium">{arena.participantes}</span>
                <span className="text-xs text-[#8b90a5]">Inscritos</span>
              </div>
              <div className="flex flex-col items-center">
                <User size={20} className="text-amber-400 mb-2" />
                <span className="text-[#e4e6ef] font-medium truncate w-full text-center">{arena.criador || 'Admin'}</span>
                <span className="text-xs text-[#8b90a5]">Criador</span>
              </div>
            </div>

            <div className="text-left bg-[#181b2a] p-6 rounded-xl border border-[#252a3a] mb-10">
              <h3 className="text-lg font-semibold text-[#e4e6ef] mb-4 flex items-center">
                <Swords size={20} className="mr-2 text-[#7c5cfc]" />
                Regras da Arena
              </h3>
              <ul className="space-y-3 text-sm text-[#8b90a5]">
                <li className="flex items-start">
                  <CheckCircle2 size={16} className="mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                  <span>Cada desafio resolvido vale pontos baseados na dificuldade.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={16} className="mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                  <span>Tempo de resolução é critério de desempate.</span>
                </li>
                {arena.tipo === 'verificada' && (
                  <li className="flex items-start">
                    <CheckCircle2 size={16} className="mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                    <span>Não é permitido consultar materiais externos.</span>
                  </li>
                )}
                <li className="flex items-start">
                  <CheckCircle2 size={16} className="mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                  <span>Submissões ilimitadas.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={16} className="mr-2 mt-0.5 text-emerald-400 flex-shrink-0" />
                  <span>Arena mede desempenho: não há dicas, orientação de pré-requisitos nem resolução comentada. Para aprender, use o Treinamento.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {arena.inscrito ? (
                <div className="flex items-center text-emerald-400 bg-emerald-400/10 px-4 py-3 rounded-lg border border-emerald-400/20">
                  <CheckCircle2 size={20} className="mr-2" />
                  Você está inscrito
                </div>
              ) : (
                <button className="bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] px-6 py-3 rounded-lg font-medium transition-colors">
                  Inscrever-se
                </button>
              )}

              <button
                onClick={() => navigate(`/arena/${id || 'a1'}/ativa`)}
                disabled={!started}
                className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  started
                    ? 'bg-[#7c5cfc] hover:bg-[#6a4be6] text-white cursor-pointer'
                    : 'bg-[#7c5cfc]/50 text-white/50 cursor-not-allowed'
                }`}
                title={!started ? "A arena ainda não começou" : ""}
              >
                Entrar na Arena
                <Swords size={20} className="ml-2" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#12141f] bg-[#7c5cfc]/20 flex items-center justify-center text-[10px] text-[#7c5cfc] font-bold">
                    P{i}
                  </div>
                ))}
              </div>
              <span className="text-xs text-[#8b90a5]">e outros {arena.participantes - 5} participantes</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
