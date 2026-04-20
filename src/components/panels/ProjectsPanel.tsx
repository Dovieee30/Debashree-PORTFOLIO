import { useState } from 'react';
import type { PanelProps, Project } from '../../types';

const PROJECTS: Project[] = [
  {
    name: 'PLUTO', icon: '🪐', tag: 'Live · Production',
    color: '#a855f7',
    desc: 'AI college ecosystem for Indian students. Event discovery, inter-college collaboration, portfolios and organizer analytics.',
    stack: ['Node.js', 'Supabase', 'Groq', 'Firebase', 'Vercel'],
    link: 'https://plutoooo.vercel.app'
  },
  {
    name: 'FlowMind', icon: '🧠', tag: 'Hackathon',
    color: '#00c8ff',
    desc: 'AI productivity tool built and pitched at hackathon.',
    stack: ['React', 'AI API']
  },
  {
    name: 'Travel Companion', icon: '✈️', tag: 'SIH',
    color: '#22c55e',
    desc: 'Smart travel planner built for Smart India Hackathon.',
    stack: ['React', 'Maps API']
  },
  {
    name: 'ZOKU', icon: '🍜', tag: 'App',
    color: '#f59e0b',
    desc: 'Food truck aggregator — discover food trucks near you.',
    stack: ['React', 'Supabase']
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function ProjectsPanel({ onClose }: PanelProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="panel panel-open panel-projects">
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <div className="panel-body">
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="project-card"
              style={{
                border: `1px solid ${hexToRgba(p.color, 0.2)}`,
                background: hovered === i ? hexToRgba(p.color, 0.08) : 'rgba(255,255,255,0.03)',
                borderColor: hovered === i ? hexToRgba(p.color, 0.4) : hexToRgba(p.color, 0.2),
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-card-head">
                <span className="project-card-title">{p.icon} {p.name}</span>
                <span
                  className="project-card-tag"
                  style={{ color: p.color, border: `1px solid ${hexToRgba(p.color, 0.4)}` }}
                >
                  {p.tag}
                </span>
              </div>
              <p className="project-card-desc">{p.desc}</p>
              <div className="project-card-stack">{p.stack.join(' · ')}</div>
              {p.link && (
                <a
                  className="project-card-link"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: p.color, background: hexToRgba(p.color, 0.1) }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {p.link.replace('https://', '')} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
