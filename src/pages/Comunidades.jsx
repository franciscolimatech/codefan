import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Lock, Unlock, UserPlus, Check, ChevronRight, Filter } from 'lucide-react';
import { comunidades } from '../data/mockData';

export default function Comunidades() {
  const [activeTab, setActiveTab] = useState('explorar'); // 'minhas', 'explorar'
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todas', 'Disciplina', 'Linguagem', 'Tecnologia', 'Área', 'Grupo de Estudo'];

  const getAccessLabel = (tipo) => {
    if (tipo === 'aberta') return 'Aberta';
    if (tipo === 'por_solicitacao') return 'Por solicitação';
    if (tipo === 'por_convite') return 'Por convite';
    return 'Restrita';
  };

  const filteredCommunities = comunidades?.filter(com => {
    const matchesTab = activeTab === 'explorar' ? true : com.membro;
    const matchesCategory = selectedCategory === 'Todas' ? true : com.categoria === selectedCategory;
    const matchesSearch = com.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          com.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen p-8 text-[#e4e6ef] max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Comunidades</h1>
        <p className="text-sm text-[#8b90a5]">Descubra grupos, disciplinas e tecnologias para se conectar.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex space-x-6 border-b border-[#252a3a] w-full md:w-auto">
          <button 
            className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'minhas' ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc]' : 'text-[#8b90a5] hover:text-[#e4e6ef]'}`}
            onClick={() => setActiveTab('minhas')}
          >
            Minhas Comunidades
          </button>
          <button 
            className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'explorar' ? 'text-[#7c5cfc] border-b-2 border-[#7c5cfc]' : 'text-[#8b90a5] hover:text-[#e4e6ef]'}`}
            onClick={() => setActiveTab('explorar')}
          >
            Explorar
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#555a6e]" />
          </div>
          <input
            type="text"
            className="w-full bg-[#181b2a] border border-[#252a3a] rounded-lg pl-10 pr-4 py-2 text-sm text-[#e4e6ef] placeholder-[#555a6e] focus:border-[#7c5cfc] focus:outline-none"
            placeholder="Buscar comunidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-[#8b90a5] mr-2" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              selectedCategory === cat 
                ? 'bg-[#7c5cfc] text-white' 
                : 'bg-[#181b2a] border border-[#252a3a] text-[#8b90a5] hover:text-[#e4e6ef] hover:border-[#7c5cfc]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCommunities.length === 0 ? (
        <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <Search className="w-12 h-12 text-[#555a6e] mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma comunidade encontrada</h3>
          <p className="text-sm text-[#8b90a5]">Tente ajustar seus filtros ou termo de busca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommunities.map(com => (
            <Link key={com.id} to={`/comunidades/${com.id}`} className="block">
              <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 h-full flex flex-col hover:border-[#7c5cfc]/40 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${com.cor || '#7c5cfc'}20` }}
                  >
                    {com.icone}
                  </div>
                  {com.membro ? (
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2 py-1 rounded-md flex items-center">
                      <Check className="w-3 h-3 mr-1" /> Participando
                    </span>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center ${
                      com.tipo === 'aberta' ? 'bg-emerald-500/10 text-emerald-400' :
                      com.tipo === 'por_solicitacao' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {com.tipo === 'aberta' ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                      {getAccessLabel(com.tipo)}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#7c5cfc] transition-colors">{com.nome}</h3>
                <p className="text-sm text-[#8b90a5] line-clamp-2 mb-4 flex-1">{com.descricao}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#252a3a]">
                  <span className="bg-[#7c5cfc]/10 text-[#7c5cfc] text-xs font-medium px-2.5 py-1 rounded-full">
                    {com.categoria}
                  </span>
                  <div className="flex items-center text-xs text-[#8b90a5]">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{com.membros}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
