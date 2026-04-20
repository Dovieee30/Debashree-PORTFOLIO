import type { PanelProps } from '../../types';

export default function AboutPanel({ onClose }: PanelProps) {
  return (
    <div className="panel panel-open">
      <div className="panel-traffic">
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>
      <div className="panel-body">
        <div className="about-header">
          <div className="about-avatar">D</div>
          <div className="about-info">
            <div className="about-name">Debashree Mal</div>
            <div className="about-role">Computer Engineering · 2nd Year</div>
          </div>
        </div>
        <p className="about-bio">Builder of AI-powered products for underserved Indian markets.</p>
        <div className="about-tags">
          <span className="about-tag">React</span>
          <span className="about-tag">Node.js</span>
          <span className="about-tag">AI/ML</span>
          <span className="about-tag">Android</span>
          <span className="about-tag">PostgreSQL</span>
          <span className="about-tag">Supabase</span>
          <span className="about-tag">Groq</span>
          <span className="about-tag">Firebase</span>
        </div>
        <div className="about-stats">
          <div className="about-stat"><div className="stat-num">9.48</div><div className="stat-label">SGPA</div></div>
          <div className="about-stat"><div className="stat-num">3+</div><div className="stat-label">Hackathons</div></div>
          <div className="about-stat"><div className="stat-num">1</div><div className="stat-label">Live Product</div></div>
          <div className="about-stat"><div className="stat-num">2nd</div><div className="stat-label">Year</div></div>
        </div>
      </div>
    </div>
  );
}
