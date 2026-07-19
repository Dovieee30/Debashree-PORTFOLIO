import type { PanelProps } from '../../types';
import ChromaGrid from './ChromaGrid';

export default function ContactPanel({ onClose }: PanelProps) {
  const items = [
    {
      // @ts-ignore
      icon: <lord-icon src="/icons/gtvaxhwv.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#00c8ff,tertiary:#7c3aed,quaternary:#e2e8f0" style={{width: '120px', height: '120px'}}></lord-icon>,
      title: "Email",

      borderColor: "#00c8ff",
      gradient: "linear-gradient(145deg, rgba(0, 200, 255, 0.05), #000)",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=debashreee87@gmail.com"
    },
    {
      // @ts-ignore
      icon: <lord-icon src="/icons/xerxcacw.json" trigger="hover" stroke="bold" state="morph-alone" colors="primary:#ffffff,secondary:#00c8ff" style={{width: '120px', height: '120px'}}></lord-icon>,
      title: "LinkedIn",

      borderColor: "#7c3aed",
      gradient: "linear-gradient(145deg, rgba(124, 58, 237, 0.05), #000)",
      url: "https://linkedin.com/in/debashree-mal-4a6214370"
    },
    {
      // @ts-ignore
      icon: <lord-icon src="/icons/lllcnxva.json" trigger="hover" stroke="bold" colors="primary:#ffffff,secondary:#00c8ff,tertiary:#7c3aed" style={{width: '120px', height: '120px'}}></lord-icon>,
      title: "GitHub",

      borderColor: "#e2e8f0",
      gradient: "linear-gradient(145deg, rgba(226, 232, 240, 0.05), #000)",
      url: "https://github.com/Dovieee30"
    }
  ];

  return (
    <div className="panel panel-open" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>

      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '17px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.2em', padding: '16px 24px 0 24px', margin: 0, opacity: 0.9 }}>
        CONTACT ME
      </h2>

      <div className="panel-body" style={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ flex: 1, width: '100%', maxWidth: '850px', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', marginTop: '24px' }}>
          <ChromaGrid 
            items={items}
            radius={250}
            damping={0.6}
            fadeOut={1.5}
            ease="power3.out"
            columns={3}
          />
        </div>
        
      </div>
    </div>
  );
}
