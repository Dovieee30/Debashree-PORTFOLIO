import { useState, useEffect, useRef } from 'react';
import type { PanelProps, Project } from '../../types';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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
  const [showWatermark, setShowWatermark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let isHovering = false;
    
    const scroller = containerRef.current?.querySelector('.scroll-stack-scroller') as HTMLElement;
    if (!scroller) return;

    scroller.addEventListener('mouseenter', () => isHovering = true);
    scroller.addEventListener('mouseleave', () => isHovering = false);

    const handleScroll = () => {
      if (scroller.scrollTop > 50) {
        setShowWatermark(false);
        scroller.removeEventListener('scroll', handleScroll);
      }
    };
    scroller.addEventListener('scroll', handleScroll);

    const scrollStep = () => {
      if (!isHovering) {
        scroller.scrollTop += 0.5;
      }
      rafId = requestAnimationFrame(scrollStep);
    };
    rafId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(rafId);
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="panel panel-open panel-projects" ref={containerRef}>
      <div className="panel-traffic" style={{ position: 'relative', zIndex: 10 }}>
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.08em', padding: '16px 24px 0 24px', margin: 0 }}>MY PROJECTS</h2>
      <div style={{ flex: 1, overflow: 'hidden', height: 'calc(100% - 80px)', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.08)',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: showWatermark ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <span style={{ fontSize: '48px', lineHeight: '1' }}>⇡</span>
          <span style={{ fontSize: '20px', letterSpacing: '0.2em', marginTop: '4px' }}>SCROLL</span>
        </div>
        
        <ScrollStack
          itemDistance={100}
          itemScale={0.03}
          itemStackDistance={30}
          baseScale={0.85}
          scaleDuration={0.5}
        >
          {PROJECTS.map((p, i) => (
            <ScrollStackItem key={p.name}>
              <div
                className="project-card"
                style={{
                  border: 'none',
                  background: hovered === i ? '#2a2a2a' : '#1e1e1e',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: '#ffffff',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'background 0.3s ease, box-shadow 0.3s ease'
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
                    style={{ 
                      color: p.color, 
                      background: hexToRgba(p.color, 0.1),
                      transition: 'background 0.2s ease, opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = hexToRgba(p.color, 0.2); }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = hexToRgba(p.color, 0.1); }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.link.replace('https://', '')} ↗
                  </a>
                )}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
