import React from 'react';
import { CATEGORIES, TOOLS_DATA } from '../data/toolsData';
import { PageRoute, Tool } from '../types';
import { ToolCard } from '../components/ToolCard';
import { ToolLogo } from '../components/ToolLogos';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Compass, 
  CheckCircle, 
  Zap, 
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectTool: (tool: Tool) => void;
  bookmarks: string[];
  onToggleBookmark: (toolId: string) => void;
  comparedToolIds: string[];
  onToggleCompare: (toolId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectTool,
  bookmarks,
  onToggleBookmark,
  comparedToolIds,
  onToggleCompare,
}) => {
  const featuredTools = TOOLS_DATA.filter(t => t.isFeatured);

  return (
    <div className="space-y-20 py-8 animate-fadeIn">
      
      {/* Hero Section matching Reference Image input_file_0.png */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 pb-12 space-y-8 px-4">
        
        {/* Main Display Headline */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-sans">
            Todas las herramientas <br className="hidden sm:inline" />
            de IA del diplomado, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 font-black">
              juntas
            </span>{' '}
            en un solo lugar.
          </h1>
        </div>

        {/* Subtitle strictly matching reference */}
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed font-normal tracking-wide">
          Deja de perder tiempo eligiendo. Filtra por lo que necesitas hacer — escribir, diseñar, programar, analizar— y encuentra la herramienta exacta en segundos.
        </p>

        {/* CTA Button Bar matching reference image */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('directory')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all"
          >
            <span>Explorar herramientas</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('workflows')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1924] hover:bg-[#232232] border border-white/10 text-neutral-200 text-xs sm:text-sm font-bold transition-all"
          >
            <span>Ver flujos de trabajo</span>
          </button>
        </div>

        {/* Stats Cards Bar matching reference image */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl bg-[#16151f]/80 border border-white/10 backdrop-blur-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white block">29</span>
            <span className="text-[11px] text-neutral-400 font-medium block">Herramientas</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#16151f]/80 border border-white/10 backdrop-blur-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white block">5</span>
            <span className="text-[11px] text-neutral-400 font-medium block">Categorías</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#16151f]/80 border border-white/10 backdrop-blur-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white block">4</span>
            <span className="text-[11px] text-neutral-400 font-medium block">Flujos guiados</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#16151f]/80 border border-white/10 backdrop-blur-sm text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
            <span className="text-[11px] text-neutral-400 font-medium block">Acceso directo</span>
          </div>
        </div>

        {/* Mouse Scroll Indicator matching bottom center of reference */}
        <div className="pt-8 flex justify-center">
          <div className="w-5 h-8 rounded-full border-2 border-neutral-600 flex justify-center p-1">
            <div className="w-1 h-2 bg-neutral-400 rounded-full animate-bounce" />
          </div>
        </div>

      </section>

      {/* Categories Grid with REAL Official Tool Icons */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>Categorías del Diplomado</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Alineadas con los módulos de aprendizaje práctico
            </p>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('directory');
              }}
              className="group cursor-pointer p-5 rounded-2xl bg-[#121118]/80 border border-white/10 hover:border-purple-500/50 hover:bg-[#181722] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                    {cat.count} herramientas
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Sample tool icons inside category preview */}
              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center -space-x-1.5">
                  {TOOLS_DATA.filter(t => t.category === cat.id).slice(0, 4).map(t => (
                    <div key={t.id} className="w-6 h-6 rounded-full bg-[#1e1d28] border border-white/10 p-1 flex items-center justify-center">
                      <ToolLogo toolId={t.id} className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-purple-400 group-hover:underline">
                  Explorar
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Imprescindibles
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Herramientas Clave del Proyecto Final
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Software oficial utilizado para construir, validar y desplegar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isBookmarked={bookmarks.includes(tool.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectTool={onSelectTool}
              isCompared={comparedToolIds.includes(tool.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>

      {/* AI Recommender Banner */}
      <section className="p-8 rounded-3xl bg-[#161520] border border-purple-500/20 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Asistente Inteligente Gemini</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Dudas sobre qué combinación utilizar?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Haz tu consulta en lenguaje natural (ej: &quot;Necesito resumir 10 archivos PDF y convertirlos en diapositivas con voz&quot;) y obtén la pila recomendada.
            </p>
          </div>

          <button
            onClick={() => onNavigate('recommender')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Consultar Asistente IA</span>
          </button>
        </div>
      </section>

      {/* Features Value Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#121118] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Logos Reales e Identidad
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Identifica rápidamente cada software por su imagen de marca oficial y accede directamente a sus sitios documentados.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121118] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Información Actualizada
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Conoce los planes de precio, niveles de dificultad, mejores usos y consejos prácticos para las entregas del diplomado.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121118] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Flujos Paso a Paso
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Combina herramientas en secuencias guiadas para pasar de una idea o boceto inicial a una app en Netlify.
          </p>
        </div>
      </section>

    </div>
  );
};
