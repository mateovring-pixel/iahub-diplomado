import React, { useState } from 'react';
import { WORKFLOWS_DATA, TOOLS_DATA } from '../data/toolsData';
import { Tool } from '../types';
import { ToolLogo } from '../components/ToolLogos';
import { 
  Workflow as WorkflowIcon, 
  Rocket, 
  Presentation, 
  BarChart3, 
  Clock, 
  Lightbulb, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface WorkflowsPageProps {
  onSelectTool: (tool: Tool) => void;
}

export const WorkflowsPage: React.FC<WorkflowsPageProps> = ({ onSelectTool }) => {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>(WORKFLOWS_DATA[0].id);

  const activeWorkflow = WORKFLOWS_DATA.find(w => w.id === activeWorkflowId) || WORKFLOWS_DATA[0];

  const getWorkflowIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-pink-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      default: return <WorkflowIcon className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <WorkflowIcon className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Flujos de Trabajo del Diplomado (Workflows)
          </h1>
        </div>
        <p className="text-xs text-neutral-400 mt-1">
          Guías integradas paso a paso para encadenar múltiples herramientas de cero a producto
        </p>
      </div>

      {/* Workflow Tabs Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WORKFLOWS_DATA.map((wf) => {
          const isActive = wf.id === activeWorkflowId;
          return (
            <div
              key={wf.id}
              onClick={() => setActiveWorkflowId(wf.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-br from-purple-950/60 via-fuchsia-950/40 to-neutral-900 border-purple-500/50 shadow-xl shadow-purple-500/10'
                  : 'bg-[#121118] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10">
                  {getWorkflowIcon(wf.icon)}
                </span>
                <span className="text-[10px] font-bold text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {wf.durationEstimate}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white mb-1">
                {wf.title}
              </h3>
              <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                {wf.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Workflow Step-by-Step Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121118] border border-white/10 shadow-2xl space-y-6">
        
        {/* Workflow Overview Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
              {activeWorkflow.module}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeWorkflow.title}
            </h2>
            <p className="text-xs text-neutral-300 mt-1 max-w-2xl leading-relaxed">
              {activeWorkflow.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{activeWorkflow.durationEstimate}</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs font-semibold text-purple-300">
              {activeWorkflow.difficulty}
            </span>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-purple-500/20">
          {activeWorkflow.steps.map((step) => {
            const tool = TOOLS_DATA.find(t => t.id === step.toolId);
            return (
              <div key={step.stepNumber} className="relative pl-10 space-y-3">
                
                {/* Step Circle Marker */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-purple-500/20">
                  {step.stepNumber}
                </div>

                {/* Step Content Box */}
                <div className="p-5 rounded-2xl bg-[#181724] border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{step.title}</span>
                    </h3>
                    
                    {tool && (
                      <button
                        onClick={() => onSelectTool(tool)}
                        className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 transition-colors"
                      >
                        <ToolLogo toolId={step.toolId} className="w-4 h-4" />
                        <span>Herramienta: {step.toolName}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Artifact & Tip Badges */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#121118] border border-white/5 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Resultado Esperado</span>
                        <span className="text-xs text-neutral-200 font-medium">{step.outputArtifact}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121118] border border-white/5 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Tip Clave</span>
                        <span className="text-xs text-neutral-300">{step.tip}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
