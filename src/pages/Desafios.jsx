import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Check, Zap } from 'lucide-react';
import { desafios } from '../data/mockData';
import { useProgresso } from '../context/ProgressoContext';

export default function Desafios() {
  const [params] = useSearchParams();
  const { progresso } = useProgresso();
  const [searchTerm, setSearchTerm] = useState(params.get('busca') || '');
  const [category, setCategory] = useState('Todos');
  const [difficulty, setDifficulty] = useState('Todos');
  const [showResolved, setShowResolved] = useState(false);

  const categories = ['Todos', 'Programação', 'Backend', 'Frontend', 'Algoritmos', 'Banco de Dados', 'Debugging', 'Testes', 'Git'];
  const difficulties = ['Todos', 'Fácil', 'Médio', 'Difícil'];

  // Prevent error if mockData is incomplete
  const safeDesafios = desafios || [];

  const filteredDesafios = safeDesafios.filter(d => {
    const matchSearch = (d.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) || d.descricao?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCat = category === 'Todos' || d.categoria === category;
    const matchDiff = difficulty === 'Todos' || d.dificuldade === difficulty;
    const matchResolved = showResolved ? true : !progresso.desafiosResolvidos.includes(d.id);
    return matchSearch && matchCat && matchDiff && matchResolved;
  });

  const getDifficultyColor = (diff) => {
    if (diff === 'Fácil') return 'text-emerald-400 bg-emerald-400/10';
    if (diff === 'Médio') return 'text-amber-400 bg-amber-400/10';
    if (diff === 'Difícil') return 'text-red-400 bg-red-400/10';
    return 'text-gray-400 bg-gray-400/10';
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h1 className="text-2xl font-bold text-[#e4e6ef]">Desafios</h1>
          <p className="text-sm text-[#8b90a5]">
            Prefere seguir um caminho? <Link to="/trilhas" className="text-[#7c5cfc] hover:text-[#e4e6ef] transition-colors">Ver trilhas</Link>
          </p>
        </div>
        
        {/* Filter Bar */}
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#8b90a5]" />
              <input 
                type="text"
                placeholder="Buscar desafios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#181b2a] border border-[#252a3a] rounded-lg pl-10 pr-4 py-2.5 text-[#e4e6ef] placeholder-[#555a6e] focus:border-[#7c5cfc] focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="flex items-center gap-2 text-sm text-[#8b90a5] cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showResolved}
                  onChange={() => setShowResolved(!showResolved)}
                  className="rounded border-[#252a3a] bg-[#181b2a] text-[#7c5cfc] focus:ring-[#7c5cfc]"
                />
                Mostrar resolvidos
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center border-t border-[#252a3a] pt-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8b90a5]" />
              <span className="text-sm text-[#8b90a5]">Categoria:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${category === c ? 'bg-[#7c5cfc] text-white' : 'bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] hover:bg-[#252a3a]'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center border-t border-[#252a3a] pt-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#8b90a5]" />
              <span className="text-sm text-[#8b90a5]">Dificuldade:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(d => (
                <button 
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${difficulty === d ? 'bg-[#7c5cfc] text-white' : 'bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] hover:bg-[#252a3a]'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm text-[#8b90a5]">
          {filteredDesafios.length} {filteredDesafios.length === 1 ? 'desafio encontrado' : 'desafios encontrados'}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDesafios.map(desafio => (
            <Link to={`/desafios/${desafio.id}`} key={desafio.id}>
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <span className="bg-[#7c5cfc]/10 text-[#7c5cfc] text-xs font-medium px-2.5 py-1 rounded-full">
                      {desafio.categoria}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(desafio.dificuldade)}`}>
                      {desafio.dificuldade}
                    </span>
                  </div>
                  {progresso.desafiosResolvidos.includes(desafio.id) && <Check className="w-5 h-5 text-emerald-400" />}
                </div>
                
                <h3 className="text-lg font-semibold text-[#e4e6ef] mb-2">{desafio.titulo}</h3>
                <p className="text-sm text-[#8b90a5] line-clamp-2 mb-4 flex-1">{desafio.descricao}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {(desafio.linguagens || []).map(lang => (
                      <span key={lang} className="text-xs bg-[#181b2a] text-[#8b90a5] border border-[#252a3a] px-2 py-0.5 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#252a3a]">
                    <div className="text-xs text-[#8b90a5]">
                      <span className="font-medium text-[#e4e6ef]">{desafio.taxaAcerto}%</span> acerto • {desafio.tentativas} tentativas
                    </div>
                    <div className="flex items-center gap-1 text-[#7c5cfc] font-medium text-sm">
                      <Zap className="w-4 h-4" />
                      {desafio.xp} XP
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
