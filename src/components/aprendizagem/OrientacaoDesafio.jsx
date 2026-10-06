import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, Circle, X, BookOpen, ArrowRight, Lightbulb } from 'lucide-react';
import { getDesafio } from '../../data/mockData';
import { habilidadesDoDesafio, habilidadePorId } from '../../data/aprendizagem';
import { useProgresso } from '../../context/ProgressoContext';

// "Não sei por onde começar": mostra o que o desafio usa e o que o aluno já praticou.
// Nunca bloqueia: o aluno sempre pode continuar mesmo assim.
export default function OrientacaoDesafio({ desafioId, origem, onClose, onContinuar, onVerDica }) {
  const { estadoDe } = useProgresso();
  const desafio = getDesafio(desafioId);

  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [onClose]);

  const itens = habilidadesDoDesafio(desafio).map((id) => ({
    ...habilidadePorId(id),
    praticada: estadoDe(id) !== 'nao_praticado',
  }));
  const faltando = itens.filter((i) => !i.praticada);
  const linkConceito = (id) => `/conceitos/${id}?desafio=${desafioId}&de=${origem}`;

  const nomes = faltando.map((f) => f.nome);
  const listaNomes = nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes[0];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="orientacao-titulo"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#12141f] border border-[#252a3a] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b90a5] hover:text-[#e4e6ef] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 pr-6">
            <div className="w-10 h-10 rounded-lg bg-[#7c5cfc]/10 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 text-[#7c5cfc]" />
            </div>
            <div>
              <h2 id="orientacao-titulo" className="text-lg font-semibold text-[#e4e6ef]">Vamos descobrir o que está faltando.</h2>
              <p className="text-sm text-[#8b90a5] mt-0.5">Sem spoilers: olhamos só os conhecimentos que este desafio usa.</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8b90a5] mb-2">Este desafio utiliza</p>
            <ul className="space-y-2">
              {itens.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${item.praticada ? 'bg-[#181b2a] border-[#252a3a]' : 'bg-amber-400/5 border-amber-400/30'}`}
                >
                  {item.praticada
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    : <Circle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#e4e6ef]">{item.nome}</p>
                    <p className={`text-xs ${item.praticada ? 'text-[#8b90a5]' : 'text-amber-400'}`}>
                      {item.praticada ? 'você já praticou' : 'ainda não praticado'}
                    </p>
                  </div>
                  {!item.praticada && (
                    <Link to={linkConceito(item.id)} className="text-xs font-medium text-[#7c5cfc] hover:text-[#e4e6ef] transition-colors whitespace-nowrap">
                      Aprender
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {faltando.length > 0 ? (
            <div className="rounded-lg border-l-2 border-[#7c5cfc] bg-[#7c5cfc]/5 p-4">
              <p className="text-sm text-[#e4e6ef]">
                Parece que <strong>{listaNomes}</strong> {faltando.length > 1 ? 'podem ser os pontos que estão dificultando' : 'pode ser o ponto que está dificultando'} este desafio.
              </p>
              <p className="text-xs text-[#8b90a5] mt-1">Leva poucos minutos e você volta direto para cá.</p>
            </div>
          ) : (
            <div className="rounded-lg border-l-2 border-emerald-400 bg-emerald-400/5 p-4">
              <p className="text-sm text-[#e4e6ef]">Você já praticou tudo o que este desafio usa.</p>
              <p className="text-xs text-[#8b90a5] mt-1">Talvez falte só organizar o raciocínio. Uma dica pode ajudar a dar o primeiro passo.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {faltando.length > 0 ? (
              <Link
                to={linkConceito(faltando[0].id)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Aprender {faltando[0].nome}
              </Link>
            ) : (
              <button
                onClick={onVerDica}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Ver uma dica
              </button>
            )}
            <button
              onClick={onContinuar}
              className="flex-1 flex items-center justify-center gap-2 bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Continuar mesmo assim
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#555a6e] text-center">Nenhum desafio é bloqueado. Você decide o que fazer.</p>
        </div>
      </div>
    </div>
  );
}
