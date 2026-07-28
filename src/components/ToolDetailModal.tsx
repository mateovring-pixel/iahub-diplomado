import React from 'react';
import { Tool } from '../types';
import { ToolLogo } from './ToolLogos';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  BookOpen, 
  ArrowLeftRight,
  ShieldAlert
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
  onAddToCompare: (toolId: string) => void;
  isCompared: boolean;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddToCompare,
  isCompared,
}) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#121118] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto custom-scrollbar flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#121118]/95 backdrop-blur-md px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#1e1d28] border border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-inner">
              <ToolLogo toolId={tool.id} className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                {tool.categoryLabel} • Módulo {tool.moduleNumber}
              </span>
              <h2 className="text-xl font-extrabold text-white">
                {tool.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Guardado' : 'Guardar'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-400' : ''}`} />
            </button>

            <button
              onClick={() => onAddToCompare(tool.id)}
              className={`p-2 rounded-xl border transition-all ${
                isCompared 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Comparar"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Overview Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-fuchsia-950/20 to-neutral-900 border border-purple-500/20">
            <p className="text-sm text-neutral-200 leading-relaxed font-medium">
              {tool.detailedDescription}
            </p>
          </div>

          {/* Quick Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#181724] border border-white/5">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Precio</span>
              <span className="text-xs font-bold text-emerald-400">{tool.pricing}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181724] border border-white/5">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Nivel</span>
              <span className="text-xs font-bold text-purple-300">{tool.difficulty}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181724] border border-white/5 col-span-2">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Módulo del Diplomado</span>
              <span className="text-xs font-bold text-amber-300 truncate block">{tool.diplomaModule}</span>
            </div>
          </div>

          {/* Diplomado Tip Box */}
          {tool.tipsDiplomado && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  Tip Práctico para Estudiantes
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {tool.tipsDiplomado}
                </p>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Funcionalidades Clave
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {tool.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#181724] border border-white/5 text-xs text-neutral-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros vs Cons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Ventajas
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {tool.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Consideraciones
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {tool.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags */}
          <div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">Etiquetas</span>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-[11px] rounded-lg bg-white/5 border border-white/10 text-neutral-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#121118]/95 backdrop-blur-md px-6 py-4 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-3">
            {tool.officialDocUrl && (
              <a
                href={tool.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documentación</span>
              </a>
            )}

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all"
            >
              <span>Abrir Herramienta Oficial</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
