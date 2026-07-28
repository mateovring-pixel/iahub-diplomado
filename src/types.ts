export type ToolCategory = 
  | 'chatbots'
  | 'visual'
  | 'code'
  | 'google'
  | 'data-ui';

export type PricingTier = 'Gratis' | 'Freemium' | 'De Pago' | 'Open Source';
export type DifficultyLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  detailedDescription: string;
  url: string;
  iconName: string; // Lucide icon or custom key
  accentColor: string; // Tailwind border or glow color class
  bgGradient: string;
  pricing: PricingTier;
  difficulty: DifficultyLevel;
  diplomaModule: string;
  moduleNumber: number;
  tags: string[];
  bestFor: string[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  officialDocUrl?: string;
  tipsDiplomado?: string;
  isFeatured?: boolean;
}

export interface CategoryInfo {
  id: ToolCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGlow: string;
  count: number;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  toolId: string;
  toolName: string;
  outputArtifact: string;
  tip: string;
}

export interface Workflow {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  module: string;
  durationEstimate: string;
  difficulty: DifficultyLevel;
  icon: string;
  steps: WorkflowStep[];
  tags: string[];
}

export type PageRoute = 'home' | 'directory' | 'tool-detail' | 'recommender' | 'comparator' | 'workflows' | 'about';

export interface AIRecommendationRequest {
  useCase: string;
  userProfile?: 'Principiante' | 'Técnico' | 'Diseñador' | 'Emprendedor' | 'Cualquiera';
  preferredPricing?: 'Cualquiera' | 'Gratis/Freemium' | 'De Pago';
}

export interface AIRecommendationResponse {
  primaryToolId: string;
  secondaryToolIds: string[];
  reasoning: string;
  suggestedWorkflow: string[];
  proTip: string;
}
