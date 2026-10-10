import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search, Shield, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { comunidades, professores, usuarios } from '../data/mockData';

export default function MembrosComunidade() {
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const comunidade = comunidades.find((item) => String(item.id) === String(id)) || comunidades[0];

  const members = useMemo(() => {
    const professor = professores.find((item) => item.nome === comunidade.responsavel) || professores[0];
    const base = [
      { id: professor.id, nome: professor.nome, iniciais: professor.iniciais, nivel: null, papel: 'Responsável' },
      ...usuarios.slice(0, 9).map((user, index) => ({ ...user, papel: index === 1 ? 'Moderador' : 'Membro' })),
    ];
    const term = search.trim().toLowerCase();
    return term ? base.filter((item) => item.nome.toLowerCase().includes(term)) : base;
  }, [comunidade.responsavel, search]);

  return (
    <div className="min-h-screen p-8 text-[#e4e6ef] max-w-5xl mx-auto space-y-7">
      <Link to={`/comunidades/${comunidade.id}`} className="inline-flex items-center text-sm text-[#8b90a5] hover:text-[#e4e6ef] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para {comunidade.nome}
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#7c5cfc] text-sm font-medium mb-2"><Users className="w-4 h-4" /> Comunidade</div>
          <h1 className="text-2xl font-bold">Membros de {comunidade.nome}</h1>
          <p className="text-sm text-[#8b90a5] mt-1">Conheça quem participa e quem ajuda a cuidar deste espaço.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#555a6e]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar membro..."
            className="w-full bg-[#12141f] border border-[#252a3a] rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#7c5cfc]"
          />
        </div>
      </div>

      <div className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-hidden">
        {members.map((member, index) => (
          <div key={`${member.id}-${index}`} className={`p-4 flex items-center gap-4 ${index !== members.length - 1 ? 'border-b border-[#252a3a]' : ''}`}>
            <div className="w-11 h-11 rounded-full bg-[#7c5cfc]/20 text-[#7c5cfc] flex items-center justify-center font-semibold shrink-0">
              {member.iniciais}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{member.nome}</p>
                {member.papel !== 'Membro' && <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </div>
              <p className="text-xs text-[#8b90a5] mt-0.5">{member.nivel ? `Nível ${member.nivel}` : 'Professor'}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full ${member.papel === 'Responsável' ? 'bg-amber-400/10 text-amber-400' : member.papel === 'Moderador' ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]' : 'bg-[#181b2a] text-[#8b90a5]'}`}>
              {member.papel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
