export type PanelType =
  | 'about'
  | 'projects'
  | 'skills'
  | 'terminal'
  | 'resume'
  | 'contact'
  | null;

export interface DockProps {
  activePanel: PanelType;
  onIconClick: (panel: PanelType) => void;
}

export interface PanelProps {
  onClose: () => void;
}

export interface Project {
  name: string;
  desc: string;
  tag: string;
  color: string;
  icon: string;
  link?: string;
  stack: string[];
}

export interface Skill {
  name: string;
  cpu: number;
  color: string;
}
