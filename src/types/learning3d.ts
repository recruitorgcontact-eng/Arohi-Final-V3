export type SubjectType = 
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'mathematics'
  | 'geography'
  | 'astronomy'
  | 'engineering'
  | 'architecture'
  | 'history'
  | 'general_science';

export type TeachingMode = 
  | 'explain'
  | 'deep_dive'
  | 'step_by_step'
  | 'explore'
  | 'demonstrate'
  | 'quiz_me'
  | 'revision';

export type ViewMode = '3d' | 'ar' | 'vr';

export type DifficultyLevel = 'elementary' | 'high_school' | 'college_mbbs';

export interface ModelPart {
  id: string;
  name: string;
  label: string;
  description: string;
  detailedExplanation: string;
  functionText: string;
  importanceText: string;
  color?: string;
  highlightColor?: string;
  meshType?: 'sphere' | 'box' | 'cylinder' | 'torus' | 'ring' | 'tube' | 'custom';
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  layerIndex?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedComponentId?: string;
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  componentId: string;
  explanation: string;
  detailedNotes?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  audioNarrationText?: string;
  quizQuestion?: QuizQuestion;
}

export interface SimulationConfig {
  hasSimulation: boolean;
  simulationTitle: string;
  simulationDescription: string;
  type: 'flow' | 'orbit' | 'piston' | 'wave' | 'bond' | 'rotation' | 'signal';
  defaultSpeed: number;
  particleCount?: number;
  particleColor?: string;
  controlsSupported: {
    playPause: boolean;
    speedControl: boolean;
    stepByStep: boolean;
    parameterSlider?: {
      label: string;
      min: number;
      max: number;
      defaultVal: number;
      unit: string;
    };
  };
}

export interface Learning3DModel {
  id: string;
  name: string;
  title: string;
  subject: SubjectType;
  difficulty: DifficultyLevel;
  tags: string[];
  summary: string;
  overviewText: string;
  meshType: 
    | 'procedural_heart'
    | 'procedural_brain'
    | 'procedural_dna'
    | 'procedural_cell'
    | 'procedural_atom'
    | 'procedural_solar_system'
    | 'procedural_engine'
    | 'procedural_circuit'
    | 'procedural_earth'
    | 'procedural_molecule'
    | 'procedural_geometry';
  parts: ModelPart[];
  guidedLesson: LessonStep[];
  simulation: SimulationConfig;
  quizzes: QuizQuestion[];
  arSupported: boolean;
  vrSupported: boolean;
  sketchfabEmbedId?: string;
  gltfUrl?: string;
}

export interface ChatMessage3D {
  id: string;
  sender: 'user' | 'arohi';
  text: string;
  timestamp: string;
  actionRequested?: 'highlight_part' | 'start_simulation' | 'change_mode' | 'start_quiz' | 'next_lesson_step' | 'explain_simple' | 'deep_dive';
  targetPartId?: string;
  relatedLessonStep?: number;
}
