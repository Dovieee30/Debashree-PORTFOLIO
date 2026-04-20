import { useEffect, useRef } from 'react';
import type { PanelProps, Skill } from '../../types';

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
    <div className="panel panel-open">
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <div className="panel-body">
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
      </div>
    </div>
  );
}
