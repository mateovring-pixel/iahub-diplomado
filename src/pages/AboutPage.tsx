import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Code2, 
  Sparkles, 
  Rocket, 
  Globe 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const modules = [
    {
      num: 1,
      title: 'Fundamentos y Prompting Multimodal',
      desc: 'Dominio de los modelos fundacionales (Gemini, ChatGPT, Claude), técnicas de prompting avanzado y benchmarking ciegas con Arena.ai.',
      tools: ['Gemini', 'ChatGPT', 'Claude', 'NotebookLM', 'LMSYS Arena']
    },
    {
      num: 2,
      title: 'Generación Visual y Presentaciones de Impacto',
      desc: 'Creación de piezas gráficas, remoción de capas con Canva, generación con Imagen 3 y Pitch Decks ejecutivos con Gamma App.',
      tools: ['AI Studio (Imagen 3)', 'Canva Magic Studio', 'Gamma App', 'Postimages']
    },
    {
      num: 3,
      title: 'Construcción de Apps y Código (De cero a producto)',
      desc: 'Prototipado de aplicaciones web con Claude Code, AI Studio App Builder, versionado en GitHub y despliegue continuo en Netlify.',
      tools: ['AI Studio App Builder', 'Claude Code', 'GitHub', 'Netlify']
    },
    {
      num: 4,
      title: 'Agentes Personalizados y Ecosistema Google',
      desc: 'Creación de Google Gems y GPTs personalizados, automatizaciones con Google Flow y experimentos multimedia con Google Vids.',
      tools: ['Google Gems', 'Google Vids', 'Google Flow', 'Google Stitch']
    },
    {
      num: 5,
      title: 'Visualización de Datos, UI & Entrega Final',
      desc: 'Integración de gráficos interactivos con Apache ECharts, animación web con GSAP y presentación final del producto.',
      tools: ['Apache ECharts', 'Chart.js', 'Plotly', 'GSAP', 'Google Fonts']
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span>Información del Programa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Diplomado de IA Generativa: De cero a producto
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Un programa práctico diseñado para transformar conceptos e ideas en aplicaciones reales desplegadas en producción.
        </p>
      </div>

      {/* Modules Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>Syllabus por Módulos</span>
        </h2>

        <div className="grid gap-4">
          {modules.map((m) => (
            <div key={m.num} className="p-6 rounded-2xl bg-[#13131c] border border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  Módulo {m.num}
                </span>
                <span className="text-[11px] text-neutral-500">Práctico</span>
              </div>
              <h3 className="text-base font-bold text-white">{m.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{m.desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {m.tools.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-md bg-[#1a1a26] border border-white/5 text-purple-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy & Certification Notice */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-neutral-900 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Entrega del Proyecto Final</span>
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed max-w-lg">
            Recuerda que para aprobar el diplomado, tu proyecto final debe estar publicado en un enlace de Netlify o Cloud Run funcionando sin errores de consola.
          </p>
        </div>

        <a
          href="https://www.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span>Ir a Netlify Deploy</span>
        </a>
      </div>

    </div>
  );
};
