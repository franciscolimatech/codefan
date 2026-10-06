import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c5cfc]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-[#7c5cfc]/10 rounded-xl mb-4 border border-[#7c5cfc]/20">
            <Zap className="w-8 h-8 text-[#7c5cfc]" />
          </div>
          <h1 className="text-3xl font-bold text-[#e4e6ef] mb-2 tracking-tight">CodeFan</h1>
          <p className="text-[#8b90a5] text-lg">Aprenda. Pratique. Evolua.</p>
        </div>

        <div className="bg-[#12141f] border border-[#252a3a] rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-[#e4e6ef] mb-6">Acesse sua conta</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#8b90a5] mb-1.5">Email ou RA</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[#555a6e]" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181b2a] border border-[#252a3a] rounded-xl pl-11 pr-4 py-3 text-[#e4e6ef] placeholder-[#555a6e] focus:border-[#7c5cfc] focus:outline-none focus:ring-1 focus:ring-[#7c5cfc] transition-colors"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-[#8b90a5]">Senha</label>
                <a href="#" className="text-xs text-[#7c5cfc] hover:text-[#6a4be6] transition-colors">Esqueci minha senha</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[#555a6e]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181b2a] border border-[#252a3a] rounded-xl pl-11 pr-4 py-3 text-[#e4e6ef] placeholder-[#555a6e] focus:border-[#7c5cfc] focus:outline-none focus:ring-1 focus:ring-[#7c5cfc] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center group mt-2"
            >
              Entrar
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#8b90a5]">
              Novo no CodeFan? <a href="#" className="text-[#7c5cfc] hover:text-[#6a4be6] font-medium transition-colors">Criar conta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
