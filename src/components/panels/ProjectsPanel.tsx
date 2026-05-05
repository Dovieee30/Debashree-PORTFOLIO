// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import type { PanelProps, Project } from '../../types';
import CircularGallery, { CircularGalleryItem } from './CircularGallery';
import CardSwap, { Card } from './CardSwap';

const PROJECTS: Project[] = [
  {
    name: 'PLUTO',
    icon: '',
    tag: 'Live · Production',
    color: '#a855f7',
    desc: 'PLUTO isn’t just an event discovery app — but inside, it’s a complete student growth ecosystem. It connects campus and inter-college opportunities, auto-builds portfolios from real participation, and enables cross-college team collaboration — all in one platform.',
    stack: ['React', 'Next.js', 'Node.js', 'Supabase', 'Groq', 'Firebase', 'Vercel'],
    link: 'https://plutoooo.vercel.app',
    year: '2026',
    images: [
      '/Pluto/Screenshot 2026-03-31 101421.png',
      '/Pluto/Screenshot 2026-03-31 101642.png',
      '/Pluto/Screenshot 2026-03-31 102516.png',
      '/Pluto/Screenshot 2026-03-31 102649.png',
      '/Pluto/Screenshot 2026-03-31 103024.png'
    ]
  },
  {
    name: 'ZWIGGY',
    icon: '',
    tag: 'App',
    color: '#f59e0b',
    desc: 'Looks like your everyday food app — but internally powered by context-aware AI that listens, records, detects distress, and can auto-alert trusted contacts in critical moments. With a unique 3-tap safety trigger + secure PIN (5678), it instantly activates emergency support — turning a simple ordering app into a silent, always-ready safety system.',
    stack: ['React', 'Vite', 'Twilio', 'Leaflet'],
    link: 'https://zwiggy-app.vercel.app/',
    year: '2026',
    images: [
      '/Zwiggy/Screenshot 2026-04-26 170514.png',
      '/Zwiggy/Screenshot 2026-04-26 170610.png',
      '/Zwiggy/Screenshot 2026-04-26 171559.png'
    ]
  },
  {
    name: 'FLOWMIND',
    icon: '',
    tag: 'Hackathon',
    color: '#00c8ff',
    desc: 'FlowMind is an AI project manager that learns your team and predicts failures before they happen.',
    stack: ['React', 'Hindsight', 'GroqAI', 'Supabase'],
    link: 'https://flowmindprojectai.vercel.app',
    year: '2026',
    images: [
      '/Flowmind/Screenshot 2026-04-26 171809.png',
      '/Flowmind/Screenshot 2026-04-26 171930.png',
      '/Flowmind/Screenshot 2026-04-26 174352.png'
    ]
  }
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function ProjectsPanel({ onClose }: PanelProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Watermark removed
  }, []);

  return (
    <div className="panel panel-open panel-projects" ref={containerRef}>
      <div className="panel-traffic" style={{ position: 'relative', zIndex: 10 }}>
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: 'normal', padding: '16px 24px 0 24px', margin: 0 }}>MY PROJECTS</h2>
      <div style={{ flex: 1, overflow: 'hidden', height: 'calc(100% - 80px)', position: 'relative' }}>
        <CircularGallery
          bend={3}
          scrollSpeed={1.5}
          scrollEase={0.05}
          onActiveIndexChange={setActiveIndex}
        >
          {PROJECTS.map((p, i) => (
            <CircularGalleryItem key={p.name}>
              <div
                className="project-card"
                style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: hovered === i ? 'rgba(42, 42, 42, 0.9)' : 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#ffffff',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: hovered === i ? '0 20px 50px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.4)',
                  transition: 'background 0.4s ease, box-shadow 0.4s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ flex: 3.5, paddingLeft: '1.5rem', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="project-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="project-card-title" style={{ color: '#ffffff', fontSize: '20px' }}>{p.name}</span>
                    {p.year && <span style={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500 }}>{p.year}</span>}
                  </div>
                  <p className="project-card-desc" style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{p.desc}</p>
                  <div className="project-card-stack" style={{ fontSize: '13px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ 
                        padding: '5px 10px', 
                        borderRadius: '6px', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#94a3b8', 
                        letterSpacing: '0.03em',
                        fontSize: '11px',
                        fontWeight: 600 
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      className="project-card-link"
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#ffffff', 
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'background 0.2s ease, opacity 0.2s ease',
                        alignSelf: 'flex-start',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        marginTop: '12px',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.link.replace('https://', '')} ↗
                    </a>
                  )}
                </div>
                <div style={{ 
                  flex: 6.5, 
                  position: 'relative', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '0.5rem',
                  opacity: i === activeIndex ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: i === activeIndex ? 'auto' : 'none'
                }}>
                  <div style={{ width: '100%', height: '100%', position: 'relative', transform: 'translateY(-45px)' }}>
                    <CardSwap
                      cardDistance={0}
                      verticalDistance={20}
                      delay={1700}
                      pauseOnHover={false}
                      paused={i !== activeIndex}
                      skewAmount={0}
                      width="100%"
                      height="100%"
                    >
                      {p.images ? (
                        p.images.map((imgUrl, imgIdx) => (
                          <Card key={imgUrl} style={{ background: 'transparent', overflow: 'hidden', border: 'none' }}>
                            <img loading="lazy" src={imgUrl} alt={`${p.name} screenshot ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', willChange: 'transform', transform: 'translateZ(0)' }} />
                          </Card>
                        ))
                      ) : (
                        <>
                          <Card style={{ background: 'transparent' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                              Screenshot 1
                            </div>
                          </Card>
                          <Card style={{ background: `linear-gradient(135deg, #000, rgba(148, 163, 184, 0.5))` }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                              Screenshot 2
                            </div>
                          </Card>
                          <Card style={{ background: `linear-gradient(135deg, #94a3b8, #000)` }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                              Screenshot 3
                            </div>
                          </Card>
                        </>
                      )}
                    </CardSwap>
                  </div>
                </div>
              </div>
            </CircularGalleryItem>
          ))}
        </CircularGallery>
      </div>
    </div>
  );
}
