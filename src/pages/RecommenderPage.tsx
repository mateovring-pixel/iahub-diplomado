import React, { useState } from 'react';
import { TOOLS_DATA } from '../data/toolsData';
import { Tool, AIRecommendationResponse } from '../types';
import { ToolCard } from '../components/ToolCard';
import { ToolLogo } from '../components/ToolLogos';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  RotateCcw, 
  Compass,
  Loader2
} from 'lucide-react';

interface RecommenderPageProps {
  onSelectTool: (tool: Tool) => void;
  bookmarks: string[];
  onToggleBookmark: (toolId: string) => void;
  comparedToolIds: string[];
  onToggleCompare: (toolId: string) => void;
}

export const RecommenderPage: React.FC<RecommenderPageProps> = ({
  onSelectTool,
  bookmarks,
  onToggleBookmark,
  comparedToolIds,
  onToggleCompare,
}) => {
  const [useCase, setUseCase] = useState('');
  const [userProfile, setUserProfile] = useState<'Principiante' | 'Técnico' | 'Diseñador' | 'Emprendedor'>('Principiante');
  const [preferredPricing, setPreferredPricing] = useState<'Cualquiera' | 'Gratis/Freemium' | 'De Pago'>('Gratis/Freemium');
  
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendationResponse | null>(null);

  const samplePrompts = [
    "Quiero crear un prototipo de dashboard analítico interactivo con gráficos en React",
    "Necesito resumir un informe PDF pesado de 200 páginas y hacerle preguntas específicas",
    "Quiero diseñar un Pitch Deck ejecutivo de 10 slides para el proyecto final del diplomado",
    "Quiero maquetar una app web completa desde cero y desplegarla en Netlify",
    "Quiero generar imágenes fotorrealistas con texto claro para el logo de mi startup"
  ];

  const handleConsultAI = async (queryText?: string) => {
    const activeQuery = queryText || useCase;
    if (!activeQuery.trim()) return;

    setIsLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useCase: activeQuery,
          userProfile,
          preferredPricing
        })
      });

      if (!res.ok) {
        throw new Error('Error al conectar con el servidor de recomendación.');
      }

      const data: AIRecommendationResponse = await res.json();
      setRecommendation(data);
    } catch (err: any) {
      console.error(err);
      
      // Local fallback calculation
      const primaryTool = TOOLS_DATA.find(t => t.id === 'claude-code') || TOOLS_DATA[0];
      setRecommendation({
        primaryToolId: primaryTool.id,
        secondaryToolIds: ['ai-studio-builder', 'netlify'],
        reasoning: `Basado en tu necesidad "${activeQuery}", la herramienta **${primaryTool.name}** es la opción más recomendada en el diplomado por su alta velocidad e interactividad.`,
        suggestedWorkflow: [
          `Paso 1: Describe tus requerimientos en ${primaryTool.name}.`,
          `Paso 2: Genera la primera maqueta interactiva.`,
          `Paso 3: Conecta con las herramientas secundarias recomendadas para finalizar.`
        ],
        proTip: primaryTool.tipsDiplomado || 'Revisa la documentación del diplomado para más ejemplos de prompts.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const primaryTool = recommendation ? TOOLS_DATA.find(t => t.id === recommendation.primaryToolId) || TOOLS_DATA[0] : null;
  const secondaryTools = recommendation ? recommendation.secondaryToolIds.map(id => TOOLS_DATA.find(t => t.id === id)).filter(Boolean) as Tool[] : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 animate-fadeIn">
      
      {/* Title Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Asistente Inteligente del Diplomado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          ¿Qué herramienta debo usar?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Describe tu objetivo en lenguaje natural y nuestro modelo razonará sobre todo el inventario del diplomado para sugerirte la combinación exacta.
        </p>
      </div>

      {/* Query Form Box */}
      <div className="p-6 rounded-3xl bg-[#121118] border border-white/10 shadow-2xl space-y-5">
        
        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
            Describe tu proyecto o la tarea a realizar:
          </label>
          <div className="relative">
            <textarea
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="Ejemplo: Quiero crear un prototipo de dashboard analítico para ventas con gráficos interactivos y desplegarlo en un enlace público..."
              rows={3}
              className="w-full bg-[#181724] border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 resize-none transition-all"
            />
          </div>
        </div>

        {/* Quick Sample Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 block">
            Ejemplos comunes (haz clic para probar):
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUseCase(promptText);
                  handleConsultAI(promptText);
                }}
                className="text-[11px] text-neutral-300 bg-[#181724] hover:bg-purple-950/40 border border-white/10 hover:border-purple-500/30 px-3 py-1.5 rounded-xl transition-all text-left truncate max-w-full"
              >
                💡 {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
              Tu Perfil
            </label>
            <select
              value={userProfile}
              onChange={(e) => setUserProfile(e.target.value as any)}
              className="w-full bg-[#181724] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none"
            >
              <option value="Principiante">Principiante (Sin código)</option>
              <option value="Técnico">Técnico / Desarrollador</option>
              <option value="Diseñador">Diseñador / Creador de Contenido</option>
              <option value="Emprendedor">Emprendedor / Gestor de Producto</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
              Preferencia de Licencia
            </label>
            <select
              value={preferredPricing}
              onChange={(e) => setPreferredPricing(e.target.value as any)}
              className="w-full bg-[#181724] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none"
            >
              <option value="Gratis/Freemium">Herramientas Gratis o Freemium</option>
              <option value="Cualquiera">Cualquier plan (Incluso de pago)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleConsultAI()}
          disabled={isLoading || !useCase.trim()}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
            isLoading || !useCase.trim()
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-500 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/20'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analizando el mejor match con Gemini...</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4" />
              <span>Obtener Recomendación Personalizada</span>
            </>
          )}
        </button>

      </div>

      {/* Results Section */}
      {recommendation && primaryTool && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Reasoning Header Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/50 via-fuchsia-950/30 to-neutral-900 border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Diagnóstico de Recomendación
              </span>
              <button
                onClick={() => {
                  setRecommendation(null);
                  setUseCase('');
                }}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nueva consulta</span>
              </button>
            </div>

            <p className="text-sm sm:text-base text-neutral-100 leading-relaxed font-medium">
              {recommendation.reasoning}
            </p>

            {/* Pro Tip Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                  Pro-Tip del Diplomado
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {recommendation.proTip}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Main Tool Display */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Herramienta Principal Recomendada
            </h3>
            <div className="grid grid-cols-1">
              <ToolCard
                tool={primaryTool}
                isBookmarked={bookmarks.includes(primaryTool.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectTool={onSelectTool}
                isCompared={comparedToolIds.includes(primaryTool.id)}
                onToggleCompare={onToggleCompare}
              />
            </div>
          </div>

          {/* Suggested Step by Step Workflow */}
          {recommendation.suggestedWorkflow && recommendation.suggestedWorkflow.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#121118] border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Flujo de Trabajo Sugerido
              </h3>
              <div className="space-y-3">
                {recommendation.suggestedWorkflow.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#181724] border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed pt-0.5">
                      {stepText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Tools Complement */}
          {secondaryTools.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Herramientas Complementarias
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {secondaryTools.map(st => (
                  <div key={st.id} className="p-4 rounded-2xl bg-[#121118] border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#181724] border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                        <ToolLogo toolId={st.id} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{st.name}</h4>
                        <p className="text-xs text-neutral-400 line-clamp-1">{st.tagline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectTool(st)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-purple-300 font-semibold shrink-0"
                    >
                      Ver Ficha
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
