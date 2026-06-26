import type { PanelProps } from "../../types";
import SkillsOrbit from "../SkillsOrbit";

export default function SkillsPanel({ onClose }: PanelProps) {
  return (
    <div className="panel panel-open" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="panel-traffic" style={{ position: "relative", zIndex: 10 }}>
        <div className="traffic-dot traffic-red" onClick={onClose} />
        <div className="traffic-dot traffic-yellow" />
        <div className="traffic-dot traffic-green" />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <SkillsOrbit />
      </div>
    </div>
  );
}
