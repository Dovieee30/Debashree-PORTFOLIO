// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import type { PanelProps, Project } from '../../types';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
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
      '/Pluto/WhatsApp Image 2026-04-26 at 5.30.51 PM.jpeg',
      '/Pluto/WhatsApp Image 2026-04-26 at 5.32.56 PM.jpeg',
      '/Pluto/WhatsApp Image 2026-04-26 at 5.35.23 PM.jpeg'
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
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.12)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '13px',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: activeIndex < PROJECTS.length - 1 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          Scroll ↓
        </div>
        <ScrollStack
          itemDistance={120}
          itemScale={0.03}
          itemStackDistance={50}
          baseScale={0.95}
          scaleDuration={0.5}
          stackPosition="10%"
          onActiveIndexChange={setActiveIndex}
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#ffffff',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ flex: 1, paddingRight: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="project-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="project-card-title" style={{ color: '#ffffff' }}>{p.name}</span>
                    {p.year && <span style={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}>{p.year}</span>}
                  </div>
                  <p className="project-card-desc" style={{ fontSize: '15px', color: '#cbd5e1' }}>{p.desc}</p>
                  <div className="project-card-stack" style={{ fontSize: '13px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#fff', 
                        fontWeight: 500 
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
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginTop: '16px',
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
                  flex: 1, 
                  position: 'relative', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '2rem',
                  opacity: i === activeIndex ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: i === activeIndex ? 'auto' : 'none'
                }}>
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <CardSwap
                      cardDistance={40}
                      verticalDistance={45}
                      delay={1700}
                      pauseOnHover={false}
                      paused={i !== activeIndex}
                      width="100%"
                      height="100%"
                    >
                      {p.images ? (
                        p.images.map((imgUrl, imgIdx) => (
                          <Card key={imgUrl} style={{ background: '#111', overflow: 'hidden' }}>
                            <img loading="lazy" src={imgUrl} alt={`${p.name} screenshot ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', willChange: 'transform', transform: 'translateZ(0)' }} />
                          </Card>
                        ))
                      ) : (
                        <>
                          <Card style={{ background: `linear-gradient(135deg, rgba(148, 163, 184, 0.5), #000)` }}>
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
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
