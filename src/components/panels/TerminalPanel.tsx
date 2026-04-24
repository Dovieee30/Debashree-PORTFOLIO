import { useEffect, useRef } from 'react';
import type { PanelProps } from '../../types';

interface TerminalLine {
  text: string;
  color: string;
  cursor?: boolean;
  isCommand?: boolean;
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: 'debashree@portfolio:~$ neofetch', color: '#00c8ff', isCommand: true },
  { text: '  OS:       Portfolio OS v2.0', color: '#94a3b8' },
  { text: '  Host:     Debashree Mal', color: '#e2e8f0' },
  { text: '  Kernel:   Computer Engineering · 2nd Year', color: '#94a3b8' },
  { text: '  Uptime:   19 years', color: '#94a3b8' },
  { text: '  Shell:    React/TypeScript', color: '#94a3b8' },
  { text: '  DE:       macOS-Inspired', color: '#94a3b8' },
  { text: '', color: 'transparent' },
  { text: 'debashree@portfolio:~$ ls ~/projects/', color: '#00c8ff', isCommand: true },
  { text: '  PLUTO/  FlowMind/  TravelCompanion/  ZOKU/', color: '#22c55e' },
  { text: '', color: 'transparent' },
  { text: 'debashree@portfolio:~$ cat ~/.achievements', color: '#00c8ff', isCommand: true },
  { text: '  → SGPA: 9.48', color: '#a855f7' },
  { text: '  → Smart India Hackathon (SIH)', color: '#a855f7' },
  { text: '  → Avishkar 2026', color: '#a855f7' },
  { text: '  → 1 Live Production App (PLUTO)', color: '#a855f7' },
  { text: '', color: 'transparent' },
  { text: 'debashree@portfolio:~$ echo $TECH_STACK', color: '#00c8ff', isCommand: true },
  { text: '  React · Node.js · Groq · Supabase · Firebase · PostgreSQL · Android', color: '#f59e0b' },
  { text: '', color: 'transparent' },
  { text: 'debashree@portfolio:~$ ./status.sh', color: '#00c8ff', isCommand: true },
  { text: '  [✓] Open to SDE Internships', color: '#22c55e' },
  { text: '  [✓] Building AI for underserved Indian markets', color: '#22c55e' },
  { text: '  [✓] Available now', color: '#22c55e' },
  { text: '', color: 'transparent' },
  { text: 'debashree@portfolio:~$ █', color: '#00c8ff', cursor: true },
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
      div.style.whiteSpace = 'pre';
      div.style.fontFamily = "'JetBrains Mono', monospace";
      div.style.fontSize = '15px';
      div.style.lineHeight = '2';

      if (line.cursor) {
        div.innerHTML = `<span style="color:${line.color}">${line.text.replace('█', '<span class="terminal-cursor">█</span>')}</span>`;
      } else if (line.text === '') {
        div.style.height = '8px';
      } else {
        div.style.color = line.color;
        if (line.isCommand) {
          div.style.fontWeight = '600';
        }
        div.textContent = line.text;
      }

      container.appendChild(div);
      requestAnimationFrame(() => { div.classList.add('typed'); });

      i++;
      if (i < TERMINAL_LINES.length) {
        const delay = TERMINAL_LINES[i - 1].isCommand ? 400 : 120;
        const t = setTimeout(typeLine, delay);
        timeouts.push(t);
      }
    }

    typeLine();

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
        TERMINAL
      </h2>

      <div className="panel-body" style={{ padding: 0, flex: 1, overflow: 'hidden' }}>
        <div
          className="terminal-inner"
          ref={containerRef}
          style={{
            height: '100%',
            overflowY: 'auto',
            padding: '20px 24px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '0 0 16px 16px',
          }}
        />
      </div>
    </div>
  );
}
