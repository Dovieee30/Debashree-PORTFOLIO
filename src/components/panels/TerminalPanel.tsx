import { useEffect, useRef } from 'react';
import type { PanelProps } from '../../types';

interface TerminalLine {
  text: string;
  color: string;
  cursor?: boolean;
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: '$ whoami', color: '#00c8ff' },
  { text: '→ Debashree Mal | CS Engineer', color: '#e2e8f0' },
  { text: '', color: 'transparent' },
  { text: '$ ls projects/', color: '#00c8ff' },
  { text: '→ PLUTO  FlowMind  TravelCompanion  ZOKU', color: '#94a3b8' },
  { text: '', color: 'transparent' },
  { text: '$ cat achievements.txt', color: '#00c8ff' },
  { text: '→ SIH · Avishkar 2026 · SGPA 9.48 · 1 Live App', color: '#22c55e' },
  { text: '', color: 'transparent' },
  { text: '$ ./mission.sh', color: '#00c8ff' },
  { text: '→ Building AI for underserved Indian markets.', color: '#a855f7' },
  { text: '', color: 'transparent' },
  { text: '$ cat status.txt', color: '#00c8ff' },
  { text: '→ Open to SDE internships · Available now', color: '#22c55e' },
  { text: '', color: 'transparent' },
  { text: '$ _', color: '#00c8ff', cursor: true },
];

export default function TerminalPanel({ onClose }: PanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    let i = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function typeLine() {
      if (i >= TERMINAL_LINES.length || !container) return;
      const line = TERMINAL_LINES[i];
      const div = document.createElement('div');
      div.className = 'terminal-line';

      if (line.cursor) {
        div.innerHTML = `<span style="color:${line.color}">$ </span><span class="terminal-cursor" style="color:${line.color}">█</span>`;
      } else if (line.text === '') {
        div.innerHTML = '&nbsp;';
      } else {
        div.style.color = line.color;
        div.textContent = line.text;
      }

      container.appendChild(div);
      requestAnimationFrame(() => { div.classList.add('typed'); });

      i++;
      if (i < TERMINAL_LINES.length) {
        const t = setTimeout(typeLine, 280);
        timeouts.push(t);
      }
    }

    typeLine();

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
        <div className="terminal-inner" ref={containerRef} />
      </div>
    </div>
  );
}
