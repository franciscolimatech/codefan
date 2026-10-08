import React, { useState } from 'react';
import { Bell, Lock, Palette, User, ShieldCheck, Save } from 'lucide-react';
import { currentUser } from '../data/mockData';

export default function Configuracoes() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [learningNotifications, setLearningNotifications] = useState(true);
  const [hintNotifications, setHintNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 text-[#e4e6ef] max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-[#8b90a5] mt-1">Ajuste sua conta e preferências da plataforma.</p>
      </div>

      <section className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#252a3a] flex items-center gap-3">
          <User className="w-5 h-5 text-[#7c5cfc]" />
          <div>
            <h2 className="font-semibold">Conta</h2>
            <p className="text-xs text-[#8b90a5]">Seus dados básicos e vínculo institucional.</p>
          </div>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs text-[#8b90a5]">Nome</span>
            <input value={currentUser.nome} readOnly className="w-full bg-[#181b2a] border border-[#252a3a] rounded-lg px-3 py-2.5 text-sm outline-none" />
          </label>
          <label className="space-y-2">
            <span className="text-xs text-[#8b90a5]">E-mail institucional</span>
            <input value={currentUser.email} readOnly className="w-full bg-[#181b2a] border border-[#252a3a] rounded-lg px-3 py-2.5 text-sm outline-none" />
          </label>
          <div className="md:col-span-2 flex items-center gap-3 bg-[#181b2a] border border-[#252a3a] rounded-lg p-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm font-medium">Vínculo UNIFAN verificado</p>
              <p className="text-xs text-[#8b90a5]">O RA é usado como identificador institucional e não como senha.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#12141f] border border-[#252a3a] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#252a3a] flex items-center gap-3">
          <Bell className="w-5 h-5 text-[#7c5cfc]" />
          <div>
            <h2 className="font-semibold">Notificações</h2>
            <p className="text-xs text-[#8b90a5]">Escolha o que merece chamar sua atenção.</p>
          </div>
        </div>
        <div className="divide-y divide-[#252a3a]">
          {[
            ['Lembretes por e-mail', 'Receba avisos importantes também no e-mail institucional.', emailNotifications, setEmailNotifications],
            ['Aprendizagem', 'Lembretes para continuar suas trilhas e desafios.', learningNotifications, setLearningNotifications],
            ['Orientação', 'Sugestões de conceitos e dicas para seu próximo passo.', hintNotifications, setHintNotifications],
          ].map(([title, description, value, setter]) => (
            <div key={title} className="p-5 flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-[#8b90a5] mt-1">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => setter(!value)}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${value ? 'bg-[#7c5cfc]' : 'bg-[#252a3a]'}`}
                aria-pressed={value}
              >
                <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-5">
        <section className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="w-5 h-5 text-[#7c5cfc]" />
            <h2 className="font-semibold">Aparência</h2>
          </div>
          <p className="text-sm text-[#8b90a5]">O protótipo usa o tema escuro como experiência principal.</p>
        </section>
        <section className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-[#7c5cfc]" />
            <h2 className="font-semibold">Segurança</h2>
          </div>
          <p className="text-sm text-[#8b90a5]">Alteração de senha e sessões ativas entrariam aqui na implementação real.</p>
        </section>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="inline-flex items-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Save className="w-4 h-4" />
          {saved ? 'Preferências salvas' : 'Salvar preferências'}
        </button>
      </div>
    </div>
  );
}
