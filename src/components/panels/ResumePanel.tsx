// @ts-nocheck
import type { PanelProps } from '../../types';

export default function ResumePanel({ onClose }: PanelProps) {
  return (
    <div className="panel panel-open" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>

      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.08em', padding: '16px 24px 0 24px', margin: 0 }}>
        RESUME
      </h2>

      <div className="panel-body" style={{ overflow: 'auto', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="resume-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
          {/* @ts-ignore */}
          <lord-icon
              src="https://cdn.lordicon.com/tbabdzcy.json"
              trigger="in"
              delay="500"
              stroke="bold"
              state="in-unfold"
              colors="primary:#ffffff,secondary:#00c8ff"
              style={{width: '200px', height: '200px'}}>
          </lord-icon>
          <div className="resume-title" style={{ fontSize: '28px', fontFamily: "'Syne', sans-serif", fontWeight: 800, color: '#fff' }}>Resume</div>
          <div className="resume-subtitle" style={{ color: '#00c8ff', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>Debashree Mal · Computer Engineering</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', color: '#e2e8f0' }}>
            <div className="resume-info-row">🎓 Computer Engineering · 2nd Year</div>
            <div className="resume-info-row">⚡ SGPA: 9.48 / 10</div>
            <div className="resume-info-row">💼 Seeking: SDE Internship</div>
            <div className="resume-info-row">📍 Kharghar, Navi Mumbai</div>
          </div>

          <a 
            className="resume-download" 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#1f2937',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: '14px',
              marginTop: '16px',
              transition: 'all 0.2s',
              border: '1px solid #374151'
            }}
          >
            ⬇ Download Resume
          </a>
          <div className="resume-note" style={{ fontSize: '12px', color: '#64748b', marginTop: '16px' }}>Last updated: 2026</div>
        </div>
      </div>
    </div>
  );
}
