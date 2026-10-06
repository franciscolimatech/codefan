import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Swords, Calendar, Clock, Users, Code2, Shield, 
  Trophy, ChevronRight, CheckCircle2, Circle, Zap 
} from 'lucide-react';
import { arenas } from '../data/mockData';

export default function ArenaList() {
  const [activeTab, setActiveTab] = useState('agendada');

  const filteredArenas = arenas?.filter(arena => arena.status === activeTab) || [];

  return (
    <div className="min-h-screen bg-[#0b0d14] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#e4e6ef]">Arena</h1>
          <p className="text-sm text-[#8b90a5]">Competições e desafios em tempo real.</p>
        </div>

        <div className="flex space-x-6 border-b border-[#252a3a]">
          {['agendada', 'em_andamento', 'finalizada'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc]'
                  : 'text-[#8b90a5] hover:text-[#e4e6ef]'
              }`}
            >
              {tab === 'agendada' ? 'Próximas' : tab === 'em_andamento' ? 'Em Andamento' : 'Finalizadas'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArenas.length === 0 ? (
            <div className="col-span-full text-center py-10 text-[#8b90a5]">
              Nenhuma arena encontrada nesta categoria.
            </div>
          ) : (
            filteredArenas.map((arena) => (
              <div 
                key={arena.id} 
                className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-[#e4e6ef]">{arena.titulo}</h3>
                  {arena.tipo === 'verificada' && (
                    <div className="bg-amber-400/10 text-amber-400 p-1.5 rounded-full" title="Verificada">
                      <Shield size={16} />
                    </div>
                  )}
                  {arena.tipo === 'comunidade' && (
                    <div className="bg-emerald-400/10 text-emerald-400 text-xs font-medium px-2 py-1 rounded-full">
                      {arena.comunidade || 'Comunidade'}
                    </div>
                  )}
                  {arena.tipo === 'aberta' && (
                    <div className="bg-[#5b8def]/10 text-[#5b8def] text-xs font-medium px-2 py-1 rounded-full">
                      Aberta
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-[#8b90a5] mb-4 line-clamp-2">
                  {arena.descricao}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center text-xs text-[#8b90a5]">
                    <Calendar size={14} className="mr-1.5 text-[#5b8def]" />
                    {new Date(arena.inicio).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="flex items-center text-xs text-[#8b90a5]">
                    <Clock size={14} className="mr-1.5 text-amber-400" />
                    {arena.duracao} min
                  </div>
                  <div className="flex items-center text-xs text-[#8b90a5]">
                    <Users size={14} className="mr-1.5 text-[#7c5cfc]" />
                    {arena.participantes} inscritos
                  </div>
                  <div className="flex items-center text-xs text-[#8b90a5]">
                    <Code2 size={14} className="mr-1.5 text-emerald-400" />
                    {arena.desafios} desafios
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#181b2a] text-[#8b90a5] text-xs px-2.5 py-1 rounded-lg">
                    {arena.categoria}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-[#252a3a]">
                  {arena.status === 'agendada' && (
                    <div className="flex items-center justify-between">
                      {arena.inscrito ? (
                        <span className="flex items-center text-emerald-400 text-sm font-medium">
                          <CheckCircle2 size={16} className="mr-1.5" />
                          Inscrito
                        </span>
                      ) : (
                        <button className="text-sm font-medium text-[#7c5cfc] hover:text-[#e4e6ef] transition-colors">
                          Inscrever-se
                        </button>
                      )}
                      <Link 
                        to={`/arena/${arena.id}/lobby`}
                        className="bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] px-4 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Ver Lobby
                      </Link>
                    </div>
                  )}

                  {arena.status === 'em_andamento' && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-emerald-400 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
                        Em andamento
                      </span>
                      <Link 
                        to={`/arena/${arena.id}/ativa`}
                        className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white px-4 py-1.5 rounded-lg text-sm transition-colors flex items-center"
                      >
                        {arena.inscrito ? 'Entrar' : 'Assistir'}
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  )}

                  {arena.status === 'finalizada' && (
                    <div className="flex items-center justify-between">
                      {arena.resultado ? (
                        <span className="flex items-center text-amber-400 text-sm font-medium">
                          <Trophy size={16} className="mr-1.5" />
                          {arena.resultado.posicao}º lugar - {arena.resultado.pontos} pts
                        </span>
                      ) : (
                        <span className="text-sm text-[#8b90a5]">Finalizada</span>
                      )}
                      <Link 
                        to={`/arena/${arena.id}/lobby`}
                        className="text-[#5b8def] text-sm hover:underline"
                      >
                        Ver resultado
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
