import { Link } from 'react-router-dom';
import { Lightbulb, Lock, BookOpen } from 'lucide-react';
import { getDesafio } from '../../data/mockData';
import { habilidadesDoDesafio, habilidadePorId } from '../../data/aprendizagem';
import { useProgresso } from '../../context/ProgressoContext';

const ROTULOS = ['Para pensar', 'Conceito', 'Estrutura'];

// Dicas do treinamento: reveladas uma a uma, da mais sutil à mais direta.
export default function DicasProgressivas({ desafioId, origem = 'resolver', onAbrirOrientacao }) {
  const { dicasReveladas, revelarDica, estadoDe } = useProgresso();
  const dicas = getDesafio(desafioId).dicas || [];
  const reveladas = dicasReveladas[desafioId] || 0;
  const faltando = habilidadesDoDesafio(getDesafio(desafioId)).find((id) => estadoDe(id) === 'nao_praticado');

  if (dicas.length === 0) {
    return <p className="text-sm text-[#8b90a5]">Este desafio ainda não possui dicas.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[#e4e6ef] font-medium mb-1">Dicas progressivas</h3>
        <p className="text-sm text-[#8b90a5]">
          Revele uma de cada vez. Elas começam sutis e ficam mais diretas, mas nenhuma entrega a solução.
        </p>
      </div>

      <ol className="space-y-3">
        {dicas.map((texto, i) => {
          const liberada = i < reveladas;
          const proxima = i === reveladas;
          return (
            <li
              key={i}
              className={`rounded-lg border p-4 ${liberada ? 'bg-amber-400/5 border-amber-400/30' : 'bg-[#181b2a] border-[#252a3a]'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {liberada ? <Lightbulb className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-[#555a6e]" />}
                <span className={`text-sm font-medium ${liberada ? 'text-[#e4e6ef]' : 'text-[#8b90a5]'}`}>Dica {i + 1}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#555a6e]">{ROTULOS[i] || ''}</span>
              </div>
              {liberada && <p className="text-sm text-[#e4e6ef] leading-relaxed">{texto}</p>}
              {proxima && (
                <button
                  onClick={() => revelarDica(desafioId, dicas.length)}
                  className="mt-2 text-sm font-medium text-amber-400 hover:text-amber-300 border border-amber-400/30 hover:bg-amber-400/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Revelar dica {i + 1}
                </button>
              )}
              {!liberada && !proxima && <p className="text-xs text-[#555a6e]">Disponível depois da dica {i}.</p>}
            </li>
          );
        })}
      </ol>

      <div className="rounded-lg border border-dashed border-[#252a3a] p-4 space-y-3">
        <p className="text-sm text-[#8b90a5]">Ainda sem saber por onde começar?</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAbrirOrientacao}
            className="text-sm font-medium text-[#7c5cfc] hover:text-[#e4e6ef] border border-[#7c5cfc]/30 hover:bg-[#7c5cfc]/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Não sei por onde começar
          </button>
          {faltando && (
            <Link
              to={`/conceitos/${faltando}?desafio=${desafioId}&de=${origem}`}
              className="flex items-center gap-1.5 text-sm font-medium text-[#e4e6ef] bg-[#181b2a] hover:bg-[#252a3a] border border-[#252a3a] px-3 py-1.5 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#7c5cfc]" />
              Aprender {habilidadePorId(faltando)?.nome}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
