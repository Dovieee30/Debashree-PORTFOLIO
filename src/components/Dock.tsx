import { useRef } from 'react';
import type { PanelType, DockProps } from '../types';

const DOCK_ICONS = [
  { id: 'about' as const,    emoji: '👤', label: 'about',    color: '#00c8ff' },
  { id: 'projects' as const, emoji: '📁', label: 'projects', color: '#a855f7' },
  { id: 'skills' as const,   emoji: '⚙️',  label: 'skills',   color: '#22c55e' },
  { id: 'terminal' as const, emoji: '💻', label: 'terminal', color: '#f59e0b' },
  { id: 'resume' as const,   emoji: '📄', label: 'resume',   color: '#3b82f6' },
  { id: 'contact' as const,  emoji: '📬', label: 'contact',  color: '#fb7185' },
];

export default function Dock({ activePanel, onIconClick, visible }: DockProps & { visible: boolean }) {
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const icons = dockRef.current?.querySelectorAll('.dock-icon') as NodeListOf<HTMLElement> | undefined;
    if (!icons) return;

    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(e.clientX - iconCenterX);

      let scale = 1.0;
      if (dist < 60) scale = 1.65;
      else if (dist < 120) scale = 1.3;
      else if (dist < 180) scale = 1.1;

      icon.style.transform = `scale(${scale})`;
    });
  };

  const handleMouseLeave = () => {
    const icons = dockRef.current?.querySelectorAll('.dock-icon') as NodeListOf<HTMLElement> | undefined;
    if (!icons) return;
    icons.forEach((icon) => {
      icon.style.transform = 'scale(1)';
    });
  };

  return (
    <div
      className={`dock ${visible ? 'dock-visible' : ''}`}
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {DOCK_ICONS.map((item, index) => (
        <div key={item.id} style={{ display: 'contents' }}>
          {/* Separator before contact */}
          {item.id === 'contact' && <div className="dock-separator" />}
          <div
            className="dock-icon"
            onClick={() => onIconClick(item.id as PanelType)}
          >
            <span className="emoji">{item.emoji}</span>
            <span className="label">{item.label}</span>
            <div
              className={`dock-dot ${activePanel === item.id ? 'active' : ''}`}
              style={{ background: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
