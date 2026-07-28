import React from 'react';
import { PageRoute } from '../types';
import { GraduationCap, Heart, Github, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0a0a0e] py-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                IA Hub
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Plataforma centralizada e interactiva para los estudiantes del Diplomado de IA Generativa: De cero a producto.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              Inicio
            </button>
            <button onClick={() => onNavigate('directory')} className="hover:text-white transition-colors">
              Directorio
            </button>
            <button onClick={() => onNavigate('recommender')} className="hover:text-white text-amber-300 transition-colors">
              Asistente IA
            </button>
            <button onClick={() => onNavigate('comparator')} className="hover:text-white transition-colors">
              Comparador
            </button>
            <button onClick={() => onNavigate('workflows')} className="hover:text-white transition-colors">
              Flujos
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              Diplomado
            </button>
          </div>
        </div>

        {/* Divider & Bottom Row */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Hub de Herramientas IA — Diplomado de IA Generativa. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://netlify.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-neutral-300 flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Desplegado en Netlify / Cloud Run</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
