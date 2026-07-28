import React, { useState } from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { Tool } from '../types';
import { ToolLogo } from '../components/ToolLogos';
import { 
  ArrowLeftRight, 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  ExternalLink
} from 'lucide-react';

interface ComparatorPageProps {
  comparedToolIds: string[];
  onToggleCompare: (toolId: string) => void;
  onSelectTool: (tool: Tool) => void;
}

export const ComparatorPage: React.FC<ComparatorPageProps> = ({
  comparedToolIds,
}) => {
  const [selectedToolsToCompare, setSelectedToolsToCompare] = useState<string[]>(
    comparedToolIds.length >= 2 ? comparedToolIds : ['claude', 'chatgpt', 'gemini']
  );

  const addToolToComparison = (toolId: string) => {
    if (selectedToolsToCompare.length < 3 && !selectedToolsToCompare.includes(toolId)) {
      setSelectedToolsToCompare([...selectedToolsToCompare, toolId]);
    }
  };

  const removeToolFromComparison = (toolId: string) => {
    setSelectedToolsToCompare(selectedToolsToCompare.filter(id => id !== toolId));
  };

  const comparedTools = selectedToolsToCompare
    .map(id => TOOLS_DATA.find(t => t.id === id))
    .filter(Boolean) as Tool[];

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ArrowLeftRight className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Matriz Comparativa de Herramientas
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Compara características, precios y casos de uso cara a cara para tomar la decisión ideal
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold text-neutral-500 shrink-0">Presets populares:</span>
          <button
            onClick={() => setSelectedToolsToCompare(['claude', 'chatgpt', 'gemini'])}
            className="px-3 py-1.5 rounded-xl bg-[#181724] border border-white/10 hover:border-purple-500/40 text-xs text-neutral-300 shrink-0 flex items-center gap-1.5"
          >
            <span>Claude vs ChatGPT vs Gemini</span>
          </button>
          <button
            onClick={() => setSelectedToolsToCompare(['gamma', 'canva-ai'])}
            className="px-3 py-1.5 rounded-xl bg-[#181724] border border-white/10 hover:border-purple-500/40 text-xs text-neutral-300 shrink-0 flex items-center gap-1.5"
          >
            <span>Gamma vs Canva</span>
          </button>
          <button
            onClick={() => setSelectedToolsToCompare(['apache-echarts', 'chart-js'])}
            className="px-3 py-1.5 rounded-xl bg-[#181724] border border-white/10 hover:border-purple-500/40 text-xs text-neutral-300 shrink-0 flex items-center gap-1.5"
          >
            <span>ECharts vs Chart.js</span>
          </button>
        </div>
      </div>

      {/* Tool Selector Controls */}
      <div className="p-4 rounded-2xl bg-[#121118] border border-white/10 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs font-bold text-neutral-300">
          Selecciona hasta 3 herramientas para comparar ({comparedTools.length}/3)
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {TOOLS_DATA.map((t) => {
            const isSelected = selectedToolsToCompare.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (isSelected) {
                    removeToolFromComparison(t.id);
                  } else {
                    addToolToComparison(t.id);
                  }
                }}
                disabled={!isSelected && selectedToolsToCompare.length >= 3}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md'
                    : selectedToolsToCompare.length >= 3
                    ? 'bg-white/5 text-neutral-600 cursor-not-allowed'
                    : 'bg-[#181724] border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <ToolLogo toolId={t.id} className="w-3.5 h-3.5" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      {comparedTools.length === 0 ? (
        <div className="p-12 text-center bg-[#121118] rounded-3xl border border-white/10 space-y-3">
          <ArrowLeftRight className="w-8 h-8 text-neutral-500 mx-auto" />
          <h3 className="text-base font-bold text-white">Ninguna herramienta seleccionada</h3>
          <p className="text-xs text-neutral-400">Selecciona al menos una herramienta arriba para activar la matriz comparativa.</p>
        </div>
      ) : (
        <div className="bg-[#121118] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Header Row: Tool Cards */}
              <thead>
                <tr className="border-b border-white/10 bg-[#181724]">
                  <th className="p-4 text-xs font-extrabold uppercase text-neutral-400 tracking-wider w-48">
                    Criterio
                  </th>
                  {comparedTools.map((t) => (
                    <th key={t.id} className="p-4 min-w-[260px] max-w-xs align-top">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#1e1d28] border border-white/10 p-2 flex items-center justify-center shrink-0">
                            <ToolLogo toolId={t.id} className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                              {t.categoryLabel}
                            </span>
                            <h3 className="text-base font-extrabold text-white">{t.name}</h3>
                          </div>
                        </div>
                        <button
                          onClick={() => removeToolFromComparison(t.id)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 transition-colors"
                          title="Remover"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-300 line-clamp-2 font-normal mb-3">
                        {t.tagline}
                      </p>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
                      >
                        <span>Ir a Sitio Oficial</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Matrix Body Rows */}
              <tbody className="divide-y divide-white/5 text-xs">
                
                {/* Row: Pricing */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Precio & Licencia</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {t.pricing}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row: Difficulty */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Dificultad</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 text-neutral-200 font-medium">
                      {t.difficulty}
                    </td>
                  ))}
                </tr>

                {/* Row: Diploma Module */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Módulo del Diplomado</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 text-amber-300 font-medium">
                      {t.diplomaModule}
                    </td>
                  ))}
                </tr>

                {/* Row: Best For */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Casos de Uso Ideales</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 space-y-1.5">
                      {t.bestFor.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-neutral-200">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Row: Pros */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Puntos Fuertes (Pros)</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 space-y-1.5">
                      {t.pros.map((pro, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Row: Cons */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Limitaciones</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 space-y-1.5">
                      {t.cons.map((con, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-rose-300">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Row: Student Tips */}
                <tr>
                  <td className="p-4 font-bold text-neutral-300 bg-[#161520]">Tip para Estudiantes</td>
                  {comparedTools.map((t) => (
                    <td key={t.id} className="p-4 bg-amber-500/5">
                      <p className="text-amber-200/90 italic leading-relaxed">
                        &quot;{t.tipsDiplomado || 'Aprovecha las guías del diplomado para sacarle el máximo partido.'}&quot;
                      </p>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
