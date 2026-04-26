import type { PanelProps } from '../../types';
import ChromaGrid from './ChromaGrid';

export default function ContactPanel({ onClose }: PanelProps) {
  const items = [
    {
      // @ts-ignore
      icon: <lord-icon src="https://cdn.lordicon.com/gtvaxhwv.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#00c8ff,tertiary:#7c3aed,quaternary:#e2e8f0" style={{width: '150px', height: '150px'}}></lord-icon>,
      title: "Email",
      handle: "debashreee87@gmail.com",
      borderColor: "#00c8ff",
      gradient: "linear-gradient(145deg, rgba(0, 200, 255, 0.05), #000)",
      url: "mailto:debashreee87@gmail.com"
    },
    {
      // @ts-ignore
      icon: <lord-icon src="https://cdn.lordicon.com/xerxcacw.json" trigger="hover" stroke="bold" state="morph-alone" colors="primary:#ffffff,secondary:#00c8ff" style={{width: '150px', height: '150px'}}></lord-icon>,
      title: "LinkedIn",
      handle: "linkedin.com/in/debashree-mal",
      borderColor: "#7c3aed",
      gradient: "linear-gradient(145deg, rgba(124, 58, 237, 0.05), #000)",
      url: "https://linkedin.com/in/debashree-mal-4a6214370"
    },
    {
      // @ts-ignore
      icon: <lord-icon src="https://cdn.lordicon.com/lllcnxva.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#00c8ff,tertiary:#7c3aed" style={{width: '150px', height: '150px'}}></lord-icon>,
      title: "GitHub",
      handle: "github.com/dovieee",
      borderColor: "#e2e8f0",
      gradient: "linear-gradient(145deg, rgba(226, 232, 240, 0.05), #000)",
      url: "https://github.com/dovieee"
    }
  ];

  return (
    <div className="panel panel-open" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>

      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: 'normal', padding: '16px 24px 0 24px', margin: 0 }}>
        CONTACT ME
      </h2>

      <div className="panel-body" style={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', alignItems: 'center', marginTop: '24px' }}>
          <ChromaGrid 
            items={items}
            radius={250}
            damping={0.6}
            fadeOut={1.5}
            ease="power3.out"
            columns={3}
          />
        </div>
        
        <div className="contact-note" style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Response within 24 hours ✓</div>
      </div>
    </div>
  );
}
