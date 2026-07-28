import React, { useState, useMemo } from 'react';
import { TOOLS_DATA, CATEGORIES } from '../data/toolsData';
import { Tool, ToolCategory, PricingTier, DifficultyLevel } from '../types';
import { ToolCard } from '../components/ToolCard';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Bookmark, 
  ExternalLink, 
  Info, 
  ArrowLeftRight,
  RotateCcw
} from 'lucide-react';

interface DirectoryPageProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTool: (tool: Tool) => void;
  bookmarks: string[];
  onToggleBookmark: (toolId: string) => void;
  comparedToolIds: string[];
  onToggleCompare: (toolId: string) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectTool,
  bookmarks,
  onToggleBookmark,
  comparedToolIds,
  onToggleCompare,
}) => {
  const [pricingFilter, setPricingFilter] = useState<PricingTier | 'All'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'All'>('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered tools memoization
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Category Filter
      if (selectedCategory && tool.category !== selectedCategory) {
        return false;
      }
      // Pricing Filter
      if (pricingFilter !== 'All' && tool.pricing !== pricingFilter) {
        return false;
      }
      // Difficulty Filter
      if (difficultyFilter !== 'All' && tool.difficulty !== difficultyFilter) {
        return false;
      }
      // Bookmarks Filter
      if (showBookmarksOnly && !bookmarks.includes(tool.id)) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchTagline = tool.tagline.toLowerCase().includes(q);
        const matchDescription = tool.description.toLowerCase().includes(q);
        const matchTag = tool.tags.some(t => t.toLowerCase().includes(q));
        const matchBestFor = tool.bestFor.some(b => b.toLowerCase().includes(q));
        return matchName || matchTagline || matchDescription || matchTag || matchBestFor;
      }
      return true;
    });
  }, [selectedCategory, pricingFilter, difficultyFilter, showBookmarksOnly, searchQuery, bookmarks]);

  const resetFilters = () => {
    onSelectCategory(null);
    setPricingFilter('All');
    setDifficultyFilter('All');
    setShowBookmarksOnly(false);
    onSearchChange('');
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Directorio Completo de Herramientas
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Filtra, busca y explora todas las opciones disponibles en el diplomado
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#181824] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-purple-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-purple-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
              title="Vista de lista detallada"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs text-neutral-400 font-medium px-3 py-2 rounded-xl bg-[#181824] border border-white/10">
            Mostrando <strong className="text-purple-300 font-bold">{filteredTools.length}</strong> de {TOOLS_DATA.length}
          </span>
        </div>
      </div>

      {/* Main Category Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === null
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'bg-[#181824] border border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          Todas ({TOOLS_DATA.length})
        </button>

        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-[#181824] border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {cat.title} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#13131c] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, etiquetas o caso de uso..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#1a1a26] border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pricing Dropdown */}
          <select
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value as any)}
            className="bg-[#1a1a26] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-purple-500/50"
          >
            <option value="All">Todos los precios</option>
            <option value="Gratis">Gratis</option>
            <option value="Freemium">Freemium</option>
            <option value="De Pago">De Pago</option>
            <option value="Open Source">Open Source</option>
          </select>

          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="bg-[#1a1a26] border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-purple-500/50"
          >
            <option value="All">Todos los niveles</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showBookmarksOnly
                ? 'bg-purple-600/30 border-purple-500/50 text-purple-300'
                : 'bg-[#1a1a26] border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-purple-400' : ''}`} />
            <span>Guardados ({bookmarks.length})</span>
          </button>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Restablecer filtros"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Grid or List View Content */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-[#13131c] rounded-3xl border border-white/10">
          <Filter className="w-10 h-10 text-neutral-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No se encontraron herramientas</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            No hay herramientas que coincidan con los filtros seleccionados. Intenta ampliar la búsqueda o restablecer los filtros.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors inline-block"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
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
      ) : (
        /* List Mode Table View */
        <div className="bg-[#13131c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#181826] text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  <th className="p-4">Herramienta</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Módulo</th>
                  <th className="p-4">Casos Clave</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-white/5 border border-white/10">
                          <Grid className="w-4 h-4 text-purple-400" />
                        </span>
                        <div>
                          <span 
                            onClick={() => onSelectTool(tool)}
                            className="font-bold text-white hover:text-purple-300 cursor-pointer block"
                          >
                            {tool.name}
                          </span>
                          <span className="text-[11px] text-neutral-400 line-clamp-1">{tool.tagline}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-300 font-medium">{tool.categoryLabel}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-400">Módulo {tool.moduleNumber}</td>
                    <td className="p-4 text-neutral-300 max-w-xs truncate">
                      {tool.bestFor[0]}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onToggleBookmark(tool.id)}
                          className="p-1.5 rounded-lg border border-white/10 hover:border-purple-500/40 text-neutral-400 hover:text-white"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(tool.id) ? 'fill-purple-400 text-purple-400' : ''}`} />
                        </button>
                        <button
                          onClick={() => onSelectTool(tool)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold"
                        >
                          Detalles
                        </button>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
