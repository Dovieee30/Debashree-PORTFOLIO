import { useEffect, useRef } from 'react';
import type { PanelProps, Skill } from '../../types';
import LogoLoop from './LogoLoop';
import { SiReact, SiNodedotjs, SiPostgresql, SiFirebase, SiFigma, SiCplusplus, SiTypescript, SiJavascript, SiPython, SiGit, SiDocker, SiVercel, SiSupabase, SiAndroid, SiTailwindcss, SiVite } from 'react-icons/si';

const SKILLS: Skill[] = [
  { name: 'React.exe',          cpu: 88, color: '#61dafb' },
  { name: 'Node.js.exe',        cpu: 82, color: '#84cc16' },
  { name: 'Groq_AI.exe',        cpu: 85, color: '#a855f7' },
  { name: 'PostgreSQL.exe',     cpu: 75, color: '#3b82f6' },
  { name: 'Android_Studio.exe', cpu: 70, color: '#34d399' },
  { name: 'Firebase.exe',       cpu: 65, color: '#f59e0b' },
  { name: 'C++.exe',            cpu: 60, color: '#fb7185' },
  { name: 'Figma.exe',          cpu: 55, color: '#e879f9' },
];

const techLogos = [
  { node: <SiReact color="#61dafb" />, title: 'React' },
  { node: <SiNodedotjs color="#339933" />, title: 'Node.js' },
  { node: <SiTypescript color="#3178c6" />, title: 'TypeScript' },
  { node: <SiJavascript color="#f7df1e" />, title: 'JavaScript' },
  { node: <SiPython color="#3776ab" />, title: 'Python' },
  { node: <SiPostgresql color="#4169e1" />, title: 'PostgreSQL' },
  { node: <SiFirebase color="#ffca28" />, title: 'Firebase' },
  { node: <SiSupabase color="#3ecf8e" />, title: 'Supabase' },
  { node: <SiAndroid color="#3ddc84" />, title: 'Android' },
  { node: <SiCplusplus color="#00599c" />, title: 'C++' },
  { node: <SiFigma color="#f24e1e" />, title: 'Figma' },
  { node: <SiGit color="#f05032" />, title: 'Git' },
  { node: <SiDocker color="#2496ed" />, title: 'Docker' },
  { node: <SiVercel color="#ffffff" />, title: 'Vercel' },
  { node: <SiTailwindcss color="#06b6d4" />, title: 'Tailwind' },
  { node: <SiVite color="#646cff" />, title: 'Vite' },
];

export default function SkillsPanel({ onClose }: PanelProps) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');
    // Reset all rows
    rows.forEach((row) => {
      row.classList.remove('skill-visible');
      const fill = row.querySelector('.skill-bar-fill') as HTMLElement | null;
      if (fill) fill.style.width = '0%';
    });

    // Staggered animation
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    rows.forEach((row, i) => {
      const t = setTimeout(() => {
        row.classList.add('skill-visible');
        const pct = row.getAttribute('data-pct');
        const fill = row.querySelector('.skill-bar-fill') as HTMLElement | null;
        if (fill && pct) {
          const t2 = setTimeout(() => { fill.style.width = pct + '%'; }, 80);
          timeouts.push(t2);
        }
      }, i * 80);
      timeouts.push(t);
    });

    return () => { timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className="panel panel-open" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>

      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.08em', padding: '16px 24px 0 24px', margin: 0 }}>
        MY SKILLS
      </h2>

      <div className="panel-body" style={{ overflow: 'auto', flex: 1 }}>
        <table className="skills-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Usage Bar</th>
              <th>%</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            {SKILLS.map((s) => (
              <tr key={s.name} data-pct={String(s.cpu)}>
                <td>{s.name}</td>
                <td>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" />
                  </div>
                </td>
                <td>{s.cpu}%</td>
                <td><span className="skill-status">● Running</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="skills-footer">8 processes running · System: Optimal</div>

        {/* Tech Logo Loop */}
        <div style={{ 
          marginTop: '24px', 
          borderTop: '1px solid rgba(255,255,255,0.07)', 
          paddingTop: '20px' 
        }}>
          <div style={{ 
            fontSize: '10px', 
            color: '#475569', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            marginBottom: '14px', 
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: 'center'
          }}>
            Tech Stack · Loaded Modules
          </div>
          <div style={{ height: '60px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={32}
              gap={48}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              fadeOutColor="rgba(5,5,5,0.85)"
              ariaLabel="Technology stack"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
