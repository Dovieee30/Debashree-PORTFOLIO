import type { PanelProps } from '../../types';

export default function ResumePanel({ onClose }: PanelProps) {
  return (
    <div className="panel panel-open">
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <div className="panel-body">
        <div className="resume-content">
          <div className="resume-icon">📄</div>
          <div className="resume-title">Resume</div>
          <div className="resume-subtitle">Debashree Mal · Computer Engineering</div>
          <div className="resume-divider" />
          <div className="resume-info-row">🎓 Computer Engineering · 2nd Year</div>
          <div className="resume-info-row">⚡ SGPA: 9.48 / 10</div>
          <div className="resume-info-row">💼 Seeking: SDE Internship</div>
          <div className="resume-info-row">📍 Kharghar, Navi Mumbai</div>
          <a className="resume-download" href="#" target="_blank" rel="noopener noreferrer">⬇ Download Resume</a>
          <div className="resume-note">Last updated: 2026</div>
        </div>
      </div>
    </div>
  );
}
