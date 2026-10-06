import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  ArrowRight, 
  Clock, 
  Swords, 
  Code2, 
  Trophy, 
  Zap, 
  ChevronRight, 
  Users, 
  MessageSquare, 
  Target,
  Route
} from 'lucide-react';
import { currentUser, desafios, arenas, mensagensComunidade, atividadesRecentes, trilhas } from '../data/mockData';
import { destinoEtapa } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';

export default function Home() {
  const user = currentUser || {
    nome: 'Dev',
    nivel: 5,
    xp: 2450,
    xpProximoNivel: 3000,
    sequenciaDias: 12
  };

  const xpPercentage = Math.round((user.xp / user.xpProximoNivel) * 100);

  const { progresso, resumoTrilha } = useProgresso();
  const trilhaAtual = trilhas.find((t) => t.id === progresso.ultimaTrilha) || trilhas[0];
  const resumoTrilhaAtual = resumoTrilha(trilhaAtual);

  const recentChallenges = desafios ? desafios.slice(0, 2) : [];
  const upcomingArena = arenas && arenas.length > 0 ? arenas[0] : null;

  const recentActivity = [
    { id: 1, community: 'Algoritmos e Estruturas de Dados', author: 'Prof. Silva', message: 'Lista de exercícios 3 liberada!', time: '2h atrás' },
    { id: 2, community: 'Frontend Masters', author: 'Maria', message: 'Alguém conseguiu resolver o desafio de React Hooks?', time: '4h atrás' },
    { id: 3, community: 'Maratona de Programação', author: 'João', message: 'Treino amanhã às 14h, não se esqueçam.', time: '1d atrás' }
  ];

  const suggestedChallenge = desafios ? desafios[desafios.length - 1] : {
    id: 's1',
    titulo: 'Otimização de Grafos',
    categoria: 'Algoritmos',
    dificuldade: 'Difícil'
  };

  const getDifficultyStyles = (diff) => {
    switch(diff?.toLowerCase()) {
      case 'easy': case 'fácil': return 'text-emerald-400 bg-emerald-400/10';
      case 'medium': case 'médio': return 'text-amber-400 bg-amber-400/10';
      case 'hard': case 'difícil': return 'text-red-400 bg-red-400/10';
      default: return 'text-emerald-400 bg-emerald-400/10';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      
      {/* 1. Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#12141f] border border-[#252a3a] rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e4e6ef] mb-1">Olá, {user.nome.split(' ')[0]}! 👋</h1>
          <p className="text-[#8b90a5]">Pronto para mais um dia de evolução?</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center border border-[#7c5cfc]/30">
              <span className="text-[#7c5cfc] font-bold text-lg">L{user.nivel}</span>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#8b90a5]">Nível {user.nivel}</span>
                <span className="text-[#e4e6ef]">{user.xp} / {user.xpProximoNivel} XP</span>
              </div>
              <div className="w-32 bg-[#181b2a] rounded-full h-2">
                <div className="bg-[#7c5cfc] rounded-full h-2" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="h-10 w-px bg-[#252a3a] hidden md:block"></div>
          
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl border border-orange-500/20">
            <Flame className="w-5 h-5 fill-current" />
            <div>
              <span className="font-bold">{user.sequenciaDias}</span>
              <span className="text-xs ml-1 opacity-80">dias seguidos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Continue aprendendo (trilha) */}
      {resumoTrilhaAtual.etapaAtual && (
        <section className="bg-gradient-to-r from-[#12141f] to-[#181b2a] border border-[#7c5cfc]/30 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7c5cfc]/10 flex items-center justify-center flex-shrink-0">
              <Route className="w-6 h-6 text-[#7c5cfc]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#7c5cfc] mb-1">Continue aprendendo</p>
              <h2 className="text-[#e4e6ef] font-semibold text-lg">{trilhaAtual.nome}</h2>
              <p className="text-sm text-[#8b90a5]">
                Etapa {resumoTrilhaAtual.indiceAtual + 1} de {resumoTrilhaAtual.total} · <span className="text-[#e4e6ef]">{resumoTrilhaAtual.etapaAtual.titulo}</span>
              </p>
            </div>
          </div>
          <Link
            to={destinoEtapa(trilhaAtual, resumoTrilhaAtual.etapaAtual)}
            className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#7c5cfc]/20 whitespace-nowrap"
          >
            Continuar trilha <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      )}

      {/* 2. Continuar Praticando */}
      <section>
        <div className="flex justify-between items-end mb-5">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#e4e6ef]" />
            <h2 className="text-lg font-semibold text-[#e4e6ef]">Continuar Praticando</h2>
          </div>
          <Link to="/desafios" className="text-sm text-[#7c5cfc] hover:text-[#6a4be6] flex items-center gap-1 transition-colors">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recentChallenges.map(challenge => (
            <div key={challenge.id} className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#e4e6ef] font-medium mb-1.5 group-hover:text-[#7c5cfc] transition-colors">{challenge.titulo}</h3>
                  <div className="flex gap-2">
                    <span className="bg-[#181b2a] text-[#8b90a5] text-xs px-2.5 py-1 rounded-md">
                      {challenge.categoria || 'Geral'}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md ${getDifficultyStyles(challenge.dificuldade)}`}>
                      {challenge.dificuldade}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#181b2a] flex items-center justify-center text-[#8b90a5]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#252a3a] flex justify-between items-center">
                <div className="text-xs text-[#8b90a5]">Última tentativa há 2 horas</div>
                <Link to={`/resolver/${challenge.id}`} className="bg-[#181b2a] hover:bg-[#7c5cfc] hover:text-white text-[#e4e6ef] border border-[#252a3a] hover:border-[#7c5cfc] px-4 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5">
                  Continuar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Arenas & Suggested) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 3. Próxima Arena */}
          {upcomingArena && (
            <section>
              <div className="flex justify-between items-end mb-5">
                <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-[#e4e6ef]" />
                  <h2 className="text-lg font-semibold text-[#e4e6ef]">Sua Próxima Arena</h2>
                </div>
                <Link to="/arena" className="text-sm text-[#7c5cfc] hover:text-[#6a4be6] flex items-center gap-1 transition-colors">
                  Todas as Arenas <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c5cfc]/5 rounded-bl-full pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#7c5cfc]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Trophy className="w-6 h-6 text-[#7c5cfc]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#e4e6ef] font-semibold text-lg">{upcomingArena.titulo || 'Torneio de Algoritmos'}</h3>
                        <span className="bg-[#7c5cfc]/20 text-[#7c5cfc] text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm tracking-wider">Inscrito</span>
                      </div>
                      <p className="text-[#8b90a5] text-sm mb-3">{upcomingArena.descricao}</p>
                      <div className="flex items-center gap-4 text-xs text-[#8b90a5]">
                        <span className="flex items-center gap-1.5 bg-[#181b2a] px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5" /> Começa em 2 dias
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#181b2a] px-2.5 py-1 rounded-md">
                          <Users className="w-3.5 h-3.5" /> {upcomingArena.participantes || 42} inscritos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/arena/${upcomingArena.id}/lobby`} className="bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] px-5 py-2 rounded-lg transition-colors text-sm font-medium text-center whitespace-nowrap">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* 5. Desafio Sugerido */}
          <section>
            <div className="flex justify-between items-end mb-5">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#e4e6ef]" />
                <h2 className="text-lg font-semibold text-[#e4e6ef]">Desafio Sugerido</h2>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#12141f] to-[#181b2a] border border-[#7c5cfc]/30 rounded-xl p-5 hover:border-[#7c5cfc]/60 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24 text-[#7c5cfc]" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-[#7c5cfc]/20 text-[#7c5cfc] text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" /> Recomendado para seu nível
                    </span>
                  </div>
                  <h3 className="text-[#e4e6ef] font-semibold text-lg mb-1">{suggestedChallenge.titulo || 'Estruturas de Dados Avançadas'}</h3>
                  <p className="text-[#8b90a5] text-sm">Baseado nos seus últimos desafios resolvidos.</p>
                </div>
                
                <Link to={`/resolver/${suggestedChallenge.id}`} className="bg-[#7c5cfc] hover:bg-[#6a4be6] text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm flex items-center gap-2 shadow-lg shadow-[#7c5cfc]/20">
                  Resolver Agora <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (Community Activity) */}
        <div>
          {/* 4. Atividade nas suas Comunidades */}
          <section className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#e4e6ef]" />
                <h2 className="text-lg font-semibold text-[#e4e6ef]">Suas Comunidades</h2>
              </div>
              <Link to="/comunidades" className="text-sm text-[#7c5cfc] hover:text-[#6a4be6] transition-colors p-1">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={activity.id} className="group">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#181b2a] border border-[#252a3a] flex items-center justify-center flex-shrink-0 text-[#8b90a5]">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-xs font-medium text-[#e4e6ef] truncate max-w-[150px]">{activity.community}</span>
                        <span className="text-[10px] text-[#8b90a5]">{activity.time}</span>
                      </div>
                      <p className="text-xs text-[#8b90a5] mb-1"><span className="text-[#7c5cfc]">{activity.author}:</span> {activity.message}</p>
                    </div>
                  </div>
                  {idx < recentActivity.length - 1 && <div className="h-px w-full bg-[#252a3a] mt-4"></div>}
                </div>
              ))}
            </div>

            <Link to="/comunidades" className="block w-full text-center mt-6 py-2 bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] text-sm rounded-lg border border-[#252a3a] transition-colors">
              Ver todas as mensagens
            </Link>
          </section>
        </div>

      </div>
    </div>
  );
}
