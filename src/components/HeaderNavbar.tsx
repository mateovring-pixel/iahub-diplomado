import React, { useState } from 'react';
import { PageRoute } from '../types';
import { 
  Search, 
  Menu, 
  X,
  Bookmark
} from 'lucide-react';

interface HeaderNavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  bookmarksCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentPage,
  onNavigate,
  bookmarksCount,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: PageRoute; label: string }[] = [
    { route: 'directory', label: 'Herramientas' },
    { route: 'directory', label: 'Categorías' },
    { route: 'workflows', label: 'Flujos' },
    { route: 'about', label: 'Guía' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d11]/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo strictly matching reference image: A stylized 'A' + 'IAHub' */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 p-[1px] shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#121118] rounded-[7px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-purple-300">
                <path d="M12 3L3 21H8L12 13L16 21H21L12 3Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
            IA<span className="text-purple-400">Hub</span>
          </span>
        </div>

        {/* Navigation Links strictly styled like reference */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-300">
          <button
            onClick={() => onNavigate('directory')}
            className={`transition-colors hover:text-white ${
              currentPage === 'directory' ? 'text-purple-400 font-bold' : ''
            }`}
          >
            Herramientas
          </button>
          <button
            onClick={() => onNavigate('directory')}
            className="transition-colors hover:text-white"
          >
            Categorías
          </button>
          <button
            onClick={() => onNavigate('workflows')}
            className={`transition-colors hover:text-white ${
              currentPage === 'workflows' ? 'text-purple-400 font-bold' : ''
            }`}
          >
            Flujos
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-white ${
              currentPage === 'about' ? 'text-purple-400 font-bold' : ''
            }`}
          >
            Guía
          </button>
          <button
            onClick={() => onNavigate('recommender')}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              currentPage === 'recommender'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:border-purple-500/30'
            }`}
          >
            Asistente IA
          </button>
        </nav>

        {/* Right Search Bar matching reference "Buscar /" */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block w-40 md:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPage !== 'directory' && e.target.value.trim().length > 0) {
                  onNavigate('directory');
                }
              }}
              className="w-full bg-[#16151f] border border-white/10 rounded-full py-1.5 pl-9 pr-8 text-xs text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-purple-500/50 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] text-neutral-500 bg-white/5 rounded border border-white/10 font-mono pointer-events-none">
              /
            </span>
          </div>

          {/* Bookmarks Counter Button */}
          <button
            onClick={() => onNavigate('directory')}
            className="relative p-2 rounded-full bg-[#16151f] border border-white/10 text-neutral-300 hover:text-white transition-all"
            title="Ver guardados"
          >
            <Bookmark className="w-4 h-4 text-purple-400" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-black rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#16151f] border border-white/10 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121118] border-b border-white/10 px-4 py-4 space-y-3 animate-fadeIn">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar en el sitio..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPage !== 'directory') onNavigate('directory');
              }}
              className="w-full bg-[#1a1924] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-neutral-200"
            />
          </div>

          <div className="flex flex-col gap-2 pt-1 text-xs font-semibold text-neutral-300">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className="text-left p-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
