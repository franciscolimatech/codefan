import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Hash, Users, Send, FileText, Link2, FolderGit2, MoreVertical, Reply, Crown, Shield, ChevronRight, BookOpen } from 'lucide-react';
import { comunidades, mensagensComunidade, materiaisComunidade } from '../data/mockData';

export default function ComunidadeDetalhe() {
  const { id } = useParams();
  
  const comunidade = comunidades?.find(c => String(c.id) === String(id)) || comunidades?.[0] || {
    id: 1, nome: 'Backend com Java', descricao: 'Comunidade sobre Java', icone: '☕',
    cor: '#e32c2e', membros: 120, responsavel: 'Prof. Silva', tipo: 'aberta',
    canais: [{ id: 'geral', nome: 'geral' }, { id: 'duvidas', nome: 'dúvidas' }, { id: 'materiais', nome: 'materiais' }]
  };
  
  const canais = (comunidade.canais || ['geral', 'dúvidas', 'materiais']).map((canal) =>
    typeof canal === 'string' ? { id: canal, nome: canal } : canal
  );

  const accessLabel = comunidade.tipo === 'aberta'
    ? 'Aberta'
    : comunidade.tipo === 'por_solicitacao'
      ? 'Por solicitação'
      : 'Por convite';
  
  const [selectedChannel, setSelectedChannel] = useState('geral');
  const [messageText, setMessageText] = useState('');

  const members = [
    { id: 1, nome: 'Prof. Silva', nivel: 42, role: 'Professor' },
    { id: 2, nome: 'Ana Souza', nivel: 15, role: 'Membro' },
    { id: 3, nome: 'Carlos Mendes', nivel: 8, role: 'Membro' },
    { id: 4, nome: 'Beatriz Lima', nivel: 24, role: 'Membro' },
    { id: 5, nome: 'João Pedro', nivel: 3, role: 'Membro' },
    { id: 6, nome: 'Mariana Costa', nivel: 19, role: 'Membro' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const currentMessages = mensagensComunidade?.filter(m => m.canal === selectedChannel) || [];
  const currentMaterials = materiaisComunidade || [];

  return (
    <div className="min-h-screen flex flex-col p-8 text-[#e4e6ef] max-w-7xl mx-auto">
      <Link to="/comunidades" className="inline-flex items-center text-[#8b90a5] hover:text-[#e4e6ef] mb-6 text-sm w-fit transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para comunidades
      </Link>

      {/* Header */}
      <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6 mb-6">
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mr-5 shrink-0"
              style={{ backgroundColor: `${comunidade.cor || '#7c5cfc'}20` }}
            >
              {comunidade.icone}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{comunidade.nome}</h1>
                <span className="bg-[#181b2a] border border-[#252a3a] text-xs font-medium px-2 py-1 rounded-md text-[#8b90a5]">
                  {accessLabel}
                </span>
              </div>
              <p className="text-sm text-[#8b90a5] mb-2">{comunidade.descricao}</p>
              <div className="flex items-center gap-4 text-xs text-[#555a6e]">
                <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> {comunidade.membros} membros</span>
                <span className="flex items-center"><Crown className="w-3.5 h-3.5 mr-1 text-amber-400" /> Resp: {comunidade.responsavel}</span>
              </div>
            </div>
          </div>
          <Link to="/configuracoes" className="bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] px-4 py-2 rounded-lg transition-colors text-sm font-medium whitespace-nowrap">
            Configurações
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
        {/* Left Sidebar - Channels */}
        <div className="w-full lg:w-[200px] shrink-0">
          <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-4 h-full">
            <h3 className="text-xs font-semibold text-[#8b90a5] uppercase tracking-wider mb-3 px-2">Canais</h3>
            <div className="space-y-1">
              {canais.map(canal => (
                <button
                  key={canal.id}
                  onClick={() => setSelectedChannel(canal.id)}
                  className={`w-full flex items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                    selectedChannel === canal.id 
                      ? 'bg-[#7c5cfc]/10 text-[#7c5cfc] font-medium' 
                      : 'text-[#8b90a5] hover:bg-[#181b2a] hover:text-[#e4e6ef]'
                  }`}
                >
                  <Hash className="w-4 h-4 mr-2 opacity-70" />
                  {canal.nome}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 bg-[#12141f] border border-[#252a3a] rounded-xl flex flex-col overflow-hidden min-h-[500px]">
          <div className="p-4 border-b border-[#252a3a] flex items-center justify-between bg-[#181b2a]/50">
            <div className="flex items-center text-[#e4e6ef] font-medium">
              <Hash className="w-5 h-5 mr-2 text-[#8b90a5]" />
              {canais.find(c => c.id === selectedChannel)?.nome}
            </div>
          </div>

          {selectedChannel === 'materiais' ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4">
                {currentMaterials.map((mat, idx) => (
                  <div key={idx} className="bg-[#181b2a] border border-[#252a3a] p-4 rounded-xl flex items-start gap-4 hover:border-[#7c5cfc]/40 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center text-[#7c5cfc] shrink-0">
                      {mat.tipo?.toLowerCase() === 'pdf' ? <FileText className="w-5 h-5" /> : 
                       mat.tipo?.toLowerCase() === 'link' ? <Link2 className="w-5 h-5" /> : 
                       <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#e4e6ef] group-hover:text-[#7c5cfc] transition-colors">{mat.titulo}</h4>
                      <div className="flex items-center gap-3 text-xs text-[#8b90a5] mt-1">
                        <span>Por {mat.autor}</span>
                        <span>•</span>
                        <span>{mat.data}</span>
                      </div>
                    </div>
                    <span className="bg-[#252a3a] text-[#e4e6ef] text-[10px] uppercase font-bold px-2 py-1 rounded">
                      {mat.tipo}
                    </span>
                  </div>
                ))}
                {currentMaterials.length === 0 && (
                  <div className="text-center py-10 text-[#8b90a5]">Nenhum material compartilhado ainda.</div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {currentMessages.length > 0 ? currentMessages.map((msg, idx) => (
                  <div key={idx} className="flex group">
                    <div className="w-10 h-10 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] font-medium shrink-0 mr-4">
                      {msg.autor?.iniciais || msg.autor?.nome?.substring(0, 2).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#e4e6ef]">{msg.autor?.nome || 'Usuário'}</span>
                        {msg.autor?.professor && (
                          <span className="bg-amber-500/10 text-amber-400 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Professor</span>
                        )}
                        <span className="text-[#7c5cfc] text-xs bg-[#7c5cfc]/10 px-1.5 py-0.5 rounded-sm">{msg.autor?.nivel ? `Lvl ${msg.autor.nivel}` : 'Professor'}</span>
                        <span className="text-xs text-[#555a6e] ml-2">{new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm text-[#e4e6ef] whitespace-pre-wrap">{msg.conteudo}</p>
                      
                      {msg.respostas > 0 && (
                        <div className="mt-2 flex items-center text-xs text-[#7c5cfc] font-medium cursor-pointer hover:underline">
                          <Reply className="w-3.5 h-3.5 mr-1" />
                          {msg.respostas} respostas
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center text-[#555a6e] space-y-3">
                    <Hash className="w-12 h-12 opacity-20" />
                    <p>Este é o começo do canal #{canais.find(c => c.id === selectedChannel)?.nome}.</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-[#12141f] border-t border-[#252a3a]">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Enviar mensagem em #${canais.find(c => c.id === selectedChannel)?.nome}`}
                    className="w-full bg-[#181b2a] border border-[#252a3a] rounded-lg pl-4 pr-12 py-3 text-sm text-[#e4e6ef] placeholder-[#555a6e] focus:border-[#7c5cfc] focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!messageText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#8b90a5] hover:text-[#7c5cfc] disabled:opacity-50 disabled:hover:text-[#8b90a5] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[220px] shrink-0 space-y-6">
          <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-[#8b90a5] uppercase tracking-wider">Membros ({comunidade.membros})</h3>
            </div>
            <div className="space-y-3">
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-xs font-medium shrink-0 relative">
                    {member.nome.substring(0,2).toUpperCase()}
                    {member.role === 'Professor' && (
                      <div className="absolute -bottom-1 -right-1 bg-[#12141f] rounded-full p-0.5">
                        <Shield className="w-3 h-3 text-amber-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[#e4e6ef] font-medium truncate">{member.nome}</div>
                    <div className="text-[10px] text-[#8b90a5]">Nível {member.nivel}</div>
                  </div>
                </div>
              ))}
              <Link to={`/comunidades/${comunidade.id}/membros`} className="block w-full text-center text-xs text-[#7c5cfc] hover:underline pt-2">
                Ver todos
              </Link>
            </div>
          </div>

          {selectedChannel !== 'materiais' && (
            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-4">
              <h3 className="text-xs font-semibold text-[#8b90a5] uppercase tracking-wider mb-4">Materiais Recentes</h3>
              <div className="space-y-3">
                {currentMaterials.slice(0, 2).map((mat, idx) => (
                  <div key={idx} className="flex items-start gap-2 group cursor-pointer">
                    <div className="mt-0.5 text-[#7c5cfc]">
                      {mat.tipo?.toLowerCase() === 'pdf' ? <FileText className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-[#e4e6ef] font-medium truncate group-hover:text-[#7c5cfc] transition-colors">{mat.titulo}</div>
                      <div className="text-[10px] text-[#8b90a5] truncate">Por {mat.autor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
