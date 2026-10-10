// Estados qualitativos de habilidade (sem porcentagens).
export const ESTADO_META = {
  nao_demonstrado: {
    label: 'NÃO DEMONSTRADO', nivel: 0,
    classe: 'text-[#8b90a5] bg-[#181b2a] border-[#252a3a]', segmento: 'bg-[#8b90a5]',
  },
  nao_praticado: {
    label: 'NÃO PRATICADO',
    nivel: 0,
    classe: 'text-[#8b90a5] bg-[#181b2a] border-[#252a3a]',
    segmento: 'bg-[#8b90a5]',
  },
  comecando: {
    label: 'COMEÇANDO',
    nivel: 1,
    classe: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    segmento: 'bg-amber-400',
  },
  praticando: {
    label: 'PRATICANDO',
    nivel: 2,
    classe: 'text-[#5b8def] bg-[#5b8def]/10 border-[#5b8def]/20',
    segmento: 'bg-[#5b8def]',
  },
  consistente: {
    label: 'CONSISTENTE',
    nivel: 3,
    classe: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    segmento: 'bg-emerald-400',
  },
};

export default function EstadoHabilidade({ estado, className = '' }) {
  const meta = ESTADO_META[estado] || ESTADO_META.nao_praticado;
  return (
    <span className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border whitespace-nowrap ${meta.classe} ${className}`}>
      {meta.label}
    </span>
  );
}

// Três segmentos que indicam o estágio, sem números.
export function Segmentos({ estado }) {
  const meta = ESTADO_META[estado] || ESTADO_META.nao_praticado;
  return (
    <div className="flex gap-1" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-1.5 w-6 rounded-full ${n <= meta.nivel ? meta.segmento : 'bg-[#252a3a]'}`} />
      ))}
    </div>
  );
}
