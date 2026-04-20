import type { PanelProps } from '../../types';

export default function ContactPanel({ onClose }: PanelProps) {
  return (
    <div className="panel panel-open">
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <div className="panel-body">
        <div className="contact-title">Say Hello 👋</div>
        <div className="contact-subtitle">Open to SDE internship opportunities</div>
        <div className="contact-divider" />
        <a className="contact-row" href="mailto:debashreemal@email.com">📧  debashreemal@email.com</a>
        <a className="contact-row" href="https://linkedin.com/in/debashreemal" target="_blank" rel="noopener noreferrer">💼  linkedin.com/in/debashreemal</a>
        <a className="contact-row" href="https://github.com/debashreemal" target="_blank" rel="noopener noreferrer">🐙  github.com/debashreemal</a>
        <a className="contact-row" href="#">📍  Kharghar, Navi Mumbai, India</a>
        <div className="contact-note">Response within 24 hours ✓</div>
      </div>
    </div>
  );
}
