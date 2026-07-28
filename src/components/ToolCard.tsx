import React from 'react';
import { Tool } from '../types';
import { ToolLogo } from './ToolLogos';
import { 
  ExternalLink, 
  Bookmark, 
  ArrowLeftRight,
  ChevronRight,
  Info
} from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
  onSelectTool: (tool: Tool) => void;
  isCompared?: boolean;
  onToggleCompare?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isBookmarked,
  onToggleBookmark,
  onSelectTool,
  isCompared = false,
  onToggleCompare,
}) => {
  const getPricingBadge = () => {
    switch (tool.pricing) {
      case 'Gratis':
        return <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">Gratis</span>;
      case 'Freemium':
        return <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">Freemium</span>;
      case 'De Pago':
        return <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">De Pago</span>;
      case 'Open Source':
        return <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">Open Source</span>;
    }
  };

  return (
    <div className="group relative bg-[#121118] border border-white/10 hover:border-purple-500/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Subtle top accent border instead of blur glow */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all" />

      <div>
        {/* Top Header Row with REAL Official Logo */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1a1a26] border border-white/10 group-hover:border-purple-500/40 p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <ToolLogo toolId={tool.id} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 block tracking-tight">
                {tool.categoryLabel}
              </span>
              <span className="text-[10px] text-neutral-500">Módulo {tool.moduleNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(tool.id);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Quitar de guardados' : 'Guardar herramienta'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-purple-400' : ''}`} />
            </button>

            {/* Compare Toggle Button */}
            {onToggleCompare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(tool.id);
                }}
                className={`p-1.5 rounded-lg border transition-all ${
                  isCompared 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
                title={isCompared ? 'Quitar del comparador' : 'Añadir al comparador'}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Name & Tagline */}
        <h3 
          onClick={() => onSelectTool(tool)}
          className="text-base font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer flex items-center justify-between gap-2 mb-1"
        >
          <span>{tool.name}</span>
          <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
        </h3>

        <p className="text-xs text-neutral-300 line-clamp-2 mb-3 leading-relaxed">
          {tool.tagline}
        </p>

        {/* Pricing & Difficulty Badges */}
        <div className="flex items-center flex-wrap gap-1.5 mb-4">
          {getPricingBadge()}
          <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300">
            {tool.difficulty}
          </span>
        </div>

        {/* Best For Tags Pills */}
        <div className="space-y-1 mb-4">
          <p className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
            Casos clave:
          </p>
          <div className="flex flex-wrap gap-1">
            {tool.bestFor.slice(0, 2).map((useCase, idx) => (
              <span key={idx} className="text-[11px] text-neutral-300 bg-[#181824] px-2 py-0.5 rounded-md border border-white/5 truncate max-w-full">
                • {useCase}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
        <button
          onClick={() => onSelectTool(tool)}
          className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Ficha Técnica</span>
        </button>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Ir a Sitio</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
