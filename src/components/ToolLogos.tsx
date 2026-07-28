import React from 'react';

interface ToolLogoProps {
  toolId: string;
  className?: string;
  size?: number;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ toolId, className = 'w-6 h-6', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  switch (toolId) {
    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <path
            d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
            fill="url(#gemini-grad)"
          />
          <defs>
            <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A73E8" />
              <stop offset="30%" stopColor="#8E24AA" />
              <stop offset="70%" stopColor="#D93025" />
              <stop offset="100%" stopColor="#12B5CB" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'chatgpt':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <path
            d="M22.28 9.38a5.8 5.8 0 0 0-.52-4.83 5.85 5.85 0 0 0-6.19-2.8 5.8 5.8 0 0 0-4.32-1.89 5.86 5.86 0 0 0-5.6 4.14 5.8 5.8 0 0 0-3.8 2.9 5.85 5.85 0 0 0 .58 6.78 5.8 5.8 0 0 0 .52 4.83 5.85 5.85 0 0 0 6.19 2.8 5.8 5.8 0 0 0 4.32 1.89 5.86 5.86 0 0 0 5.6-4.14 5.8 5.8 0 0 0 3.8-2.9 5.85 5.85 0 0 0-.58-6.78zM12.3 2.1a4.2 4.2 0 0 1 3.2 1.5 4.1 4.1 0 0 1-.2 1l-3.3 1.9-1.3-.8v-3.6zM4.7 6.3a4.2 4.2 0 0 1 2.5-2.5l.8.5v3.8l-3.3 1.9a4.1 4.1 0 0 1 0-3.7zm-2.1 7.2a4.2 4.2 0 0 1-.7-3.5 4.1 4.1 0 0 1 .9-.7l3.3 1.9v1.5l-3.5 0.8zm2.8 5.8a4.2 4.2 0 0 1-2.5-2.5 4.1 4.1 0 0 1 .2-1l3.3-1.9 1.3.8v3.6zm7.6 2.6a4.2 4.2 0 0 1-3.2-1.5 4.1 4.1 0 0 1 .2-1l3.3-1.9 1.3.8v3.6zm7.6-3.7a4.2 4.2 0 0 1-2.5 2.5l-.8-.5v-3.8l3.3-1.9a4.1 4.1 0 0 1 0 3.7zm2.1-7.2a4.2 4.2 0 0 1 .7 3.5 4.1 4.1 0 0 1-.9.7l-3.3-1.9v-1.5l3.5-.8z"
            fill="#10A37F"
          />
        </svg>
      );

    case 'claude':
    case 'claude-code':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="5" fill="#D97757" />
          <path
            d="M13.8 6H10.2L5 18H8.2L9.4 15.2H14.6L15.8 18H19L13.8 6ZM10.5 12.6L12 9L13.5 12.6H10.5Z"
            fill="#FFFFFF"
          />
          {toolId === 'claude-code' && (
            <path d="M17 14L20 16.5L17 19" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      );

    case 'kimi':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <circle cx="12" cy="12" r="11" fill="url(#kimi-grad)" />
          <path
            d="M8 6V18M8 12L15 6M8 12L15 18"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="kimi-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'qwen':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <circle cx="12" cy="12" r="11" fill="#1890FF" />
          <path
            d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
            fill="#FFFFFF"
          />
          <circle cx="12" cy="12" r="2.5" fill="#1890FF" />
        </svg>
      );

    case 'google-gems':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <path d="M12 2L17 7L12 12L7 7L12 2Z" fill="#4285F4" />
          <path d="M17 7L22 12L17 17L12 12L17 7Z" fill="#EA4335" />
          <path d="M12 12L17 17L12 22L7 17L12 12Z" fill="#FBBC05" />
          <path d="M7 7L12 12L7 17L2 12L7 7Z" fill="#34A853" />
        </svg>
      );

    case 'arena-ai':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#1E1E2E" />
          <path d="M6 18L18 6M6 6L18 18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#F59E0B" />
        </svg>
      );

    case 'ai-studio-visual':
    case 'codex-imagen':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#1A73E8" />
          <path
            d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z"
            fill="#FFFFFF"
          />
          <circle cx="18" cy="6" r="2" fill="#FBBC04" />
        </svg>
      );

    case 'canva-ai':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="url(#canva-grad)" />
          <path
            d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C13.5 18 15 17.5 16 16.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="canva-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'gamma':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="url(#gamma-grad)" />
          <path d="M7 8H17V11H10V13H15V16H7V8Z" fill="#FFFFFF" />
          <defs>
            <linearGradient id="gamma-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'postimages':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#3B82F6" />
          <path
            d="M12 16V8M12 8L8 12M12 8L16 12M6 18H18"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'github-copilot':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#181717" />
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 15.5376 6.293 18.5388 9.48 19.6C9.88 19.67 10.03 19.43 10.03 19.22C10.03 19.03 10.02 18.39 10.02 17.65C8 18.02 7.46 17.15 7.3 16.7C7.21 16.47 6.82 15.76 6.48 15.57C6.2 15.42 5.8 15.05 6.47 15.04C7.1 15.03 7.55 15.62 7.7 15.86C8.42 17.08 9.58 16.73 10.04 16.52C10.11 16 10.31 15.65 10.53 15.45C8.75 15.25 6.88 14.56 6.88 11.5C6.88 10.63 7.19 9.91 7.7 9.35C7.62 9.15 7.34 8.33 7.78 7.23C7.78 7.23 8.45 7.02 10.03 8.08C10.67 7.9 11.35 7.81 12.03 7.81C12.71 7.81 13.39 7.9 14.03 8.08C15.61 7.01 16.28 7.23 16.28 7.23C16.72 8.33 16.44 9.15 16.36 9.35C16.87 9.91 17.18 10.62 17.18 11.5C17.18 14.57 15.3 15.25 13.52 15.45C13.81 15.7 14.06 16.18 14.06 16.93C14.06 18 14.05 18.86 14.05 19.22C14.05 19.43 14.2 19.68 14.6 19.6C17.707 18.5388 20 15.5376 20 12C20 7.58172 16.4183 4 12 4Z"
            fill="#38BDF8"
          />
        </svg>
      );

    case 'ai-studio-builder':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#4F46E5" />
          <path
            d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20"
            stroke="#A5B4FC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'netlify':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <path
            d="M6.28 12L12 6.28L17.72 12L12 17.72L6.28 12ZM12 2L2 12L12 22L22 12L12 2Z"
            fill="#20C6B7"
          />
        </svg>
      );

    case 'google-mixboard':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#1E293B" />
          <path d="M6 16V8M10 18V6M14 14V10M18 19V5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'google-vids':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#EA4335" />
          <path d="M10 8L16 12L10 16V8Z" fill="#FFFFFF" />
        </svg>
      );

    case 'google-flow':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#10B981" />
          <path d="M13 3L4 14H11L10 21L19 10H12L13 3Z" fill="#FFFFFF" />
        </svg>
      );

    case 'google-stitch':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#2563EB" />
          <path d="M4 6H20M4 12H20M4 18H20M8 4V20M16 4V20" stroke="#93C5FD" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'nano-banana':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#FEF08A" />
          <path
            d="M6 16C8 18 14 18 17 12C18 10 18 6 18 6C18 6 14 7 11 9C8 11 6 14 6 16Z"
            fill="#EAB308"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'apache-echarts':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#181824" />
          <path d="M4 18L9 12L14 15L20 6" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="6" r="2.5" fill="#FF007F" />
        </svg>
      );

    case 'chart-js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#FF6384" />
          <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="30 15" fill="none" />
        </svg>
      );

    case 'plotly':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#1F2937" />
          <circle cx="6" cy="18" r="2" fill="#8B5CF6" />
          <circle cx="12" cy="8" r="2" fill="#EC4899" />
          <circle cx="18" cy="14" r="2" fill="#3B82F6" />
          <path d="M6 18L12 8L18 14" stroke="#6B7280" strokeWidth="1.5" />
        </svg>
      );

    case 'gsap':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#00E676" />
          <path d="M7 16C7 16 9 18 12 18C15 18 17 15 17 12C17 9 14 8 12 8C10 8 8 9.5 8 11.5" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'google-fonts':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#FBBC04" />
          <path d="M7 6H17M12 6V18M9 18H15" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'pomelli':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <circle cx="12" cy="12" r="10" fill="#EF4444" />
          <path d="M12 6V12L16 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 2V4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
          <rect width="24" height="24" rx="6" fill="#8B5CF6" />
          <path d="M12 6L14.5 11L20 12L16 16L17 21.5L12 18.5L7 21.5L8 16L4 12L9.5 11L12 6Z" fill="#FFFFFF" />
        </svg>
      );
  }
};
