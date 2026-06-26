import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  pct: number;
  src: string;
  color: string;
  ring: number;
}

interface Particle {
  ri: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

const skills: Skill[] = [
  { name: "React",      pct: 88, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",          color: "#61dafb", ring: 0 },
  { name: "Node.js",    pct: 82, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",        color: "#68a063", ring: 0 },
  { name: "Groq AI",    pct: 85, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",        color: "#a855f7", ring: 0 },
  { name: "TypeScript", pct: 80, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",color: "#3178c6", ring: 0 },
  { name: "PostgreSQL", pct: 75, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",color: "#336791", ring: 1 },
  { name: "Firebase",   pct: 65, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",       color: "#ffca28", ring: 1 },
  { name: "Android",    pct: 70, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",      color: "#3ddc84", ring: 1 },
  { name: "Docker",     pct: 62, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",        color: "#2496ed", ring: 1 },
  { name: "C++",        pct: 60, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",  color: "#9c6af7", ring: 2 },
  { name: "Figma",      pct: 55, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",          color: "#f24e1e", ring: 2 },
  { name: "Git",        pct: 78, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",              color: "#f05032", ring: 2 },
  { name: "Tailwind",   pct: 73, src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#38bdf8", ring: 2 },
];

const rings = [
  { frac: 0.195, speed: 0.00045 },
  { frac: 0.315, speed: -0.00032 },
  { frac: 0.425, speed: 0.00026 },
];

export default function SkillsOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lblRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const lbl = lblRef.current;
    if (!canvas || !wrap || !lbl) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0, cx = 0, cy = 0;
    let t = 0;
    let mouse = { x: -9999, y: -9999 };
    let hoveredSkill: Skill | null = null;
    let animId: number;

    // Preload images
    const imgs: Record<string, HTMLImageElement> = {};
    skills.forEach((s) => {
      const img = new Image();
      img.src = s.src;
      imgs[s.name] = img;
    });

    // Particles
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      ri: Math.floor(Math.random() * 3),
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.00035 + 0.0001) * (Math.random() < 0.5 ? 1 : -1),
      color: ["#a855f7", "#7c3aed", "#c084fc", "#e879f9"][Math.floor(Math.random() * 4)],
      size: Math.random() * 1.2 + 0.4,
    }));

    function resize() {
      const r = wrap!.getBoundingClientRect();
      W = canvas!.width = r.width * dpr;
      H = canvas!.height = r.height * dpr;
      canvas!.style.width = r.width + "px";
      canvas!.style.height = r.height + "px";
      cx = W / 2;
      cy = H / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    function getRingSkills(ri: number) {
      return skills.filter((s) => s.ring === ri);
    }

    function skillPos(ri: number, si: number, total: number, time: number) {
      const base = ((2 * Math.PI) / total) * si;
      const angle = base + rings[ri].speed * time;
      const r = rings[ri].frac * Math.min(W, H);
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    function drawRing(frac: number, alpha: number) {
      const r = frac * Math.min(W, H);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
      ctx.lineWidth = 0.6 * dpr;
      ctx.setLineDash([3 * dpr, 10 * dpr]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawCenter() {
      const R = 0.12 * Math.min(W, H);

      // Pulse rings
      for (let i = 3; i > 0; i--) {
        const pulse = R * (1 + i * 0.45 + 0.15 * Math.sin(t * 0.025 + i));
        const alpha = 0.06 / i;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(226,232,240,${alpha * 1.5})`;
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      }

      // Outer segmented arc (clockwise)
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2 + t * 0.004;
        const a2 = ((i + 0.6) / segments) * Math.PI * 2 + t * 0.004;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 0.92, a1, a2);
        ctx.strokeStyle = `rgba(226,232,240,${0.4 + 0.25 * Math.sin(t * 0.02 + i)})`;
        ctx.lineWidth = 2.5 * dpr;
        ctx.stroke();
      }

      // Inner counter-rotating arc
      const segments2 = 6;
      for (let i = 0; i < segments2; i++) {
        const a1 = (i / segments2) * Math.PI * 2 - t * 0.007;
        const a2 = ((i + 0.4) / segments2) * Math.PI * 2 - t * 0.007;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 0.72, a1, a2);
        ctx.strokeStyle = `rgba(148,163,184,${0.45 + 0.25 * Math.sin(t * 0.015 + i * 1.3)})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
      }

      // Inner disc
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.66, 0, Math.PI * 2);
      const gr = ctx.createRadialGradient(cx, cy - R * 0.1, 0, cx, cy, R * 0.66);
      gr.addColorStop(0, "#1e293b");
      gr.addColorStop(0.6, "#0f172a");
      gr.addColorStop(1, "#020617");
      ctx.fillStyle = gr;
      ctx.fill();
      ctx.strokeStyle = "rgba(30, 41, 59, 0.8)";
      ctx.lineWidth = 1.2 * dpr;
      ctx.stroke();

      // Text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${16.5 * dpr}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("SKILLS", cx, cy);
    }

    function drawNode(skill: Skill, pos: { x: number; y: number }, ri: number) {
      const baseR = (ri === 0 ? 21 : ri === 1 ? 18 : 15) * dpr;
      const isHov = hoveredSkill === skill;
      const r = isHov ? baseR * 1.3 : baseR;

      ctx.save();
      ctx.translate(pos.x, pos.y);

      // Glow
      const glow = ri === 0 ? 0.22 : ri === 1 ? 0.18 : 0.14;
      const pulse = glow + 0.1 * Math.sin(t * 0.025 + skills.indexOf(skill) * 0.8);
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = skill.color + Math.round(pulse * 255).toString(16).padStart(2, "0");
      ctx.fill();

      // Node bg
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0816";
      ctx.fill();
      ctx.strokeStyle = skill.color + "55";
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      // Proficiency arc
      const arc = (skill.pct / 100) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + arc);
      ctx.strokeStyle = skill.color;
      ctx.lineWidth = 2.5 * dpr;
      ctx.stroke();

      // Hover tick burst
      if (isHov) {
        const ticks = 8;
        for (let i = 0; i < ticks; i++) {
          const a = (i / ticks) * Math.PI * 2 + t * 0.05;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * (r + 3 * dpr), Math.sin(a) * (r + 3 * dpr));
          ctx.lineTo(Math.cos(a) * (r + 7 * dpr), Math.sin(a) * (r + 7 * dpr));
          ctx.strokeStyle = skill.color + "99";
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();
        }
      }

      // Logo
      const img = imgs[skill.name];
      const s = r * 0.9;
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -s / 2, -s / 2, s, s);
      } else {
        ctx.fillStyle = skill.color;
        ctx.font = `600 ${7 * dpr}px JetBrains Mono, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name.slice(0, 3).toUpperCase(), 0, 0);
      }

      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      rings.forEach((ring, i) => drawRing(ring.frac, 0.13 + i * 0.03));

      // Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const r = rings[p.ri].frac * Math.min(W, H);
        const px = cx + r * Math.cos(p.angle);
        const py = cy + r * Math.sin(p.angle);
        ctx.beginPath();
        ctx.arc(px, py, p.size * dpr, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "66";
        ctx.fill();
      });

      // Collect all positions + draw connector lines
      const allPos: { skill: Skill; pos: { x: number; y: number }; ri: number }[] = [];
      rings.forEach((_, ri) => {
        const rs = getRingSkills(ri);
        rs.forEach((skill, si) => {
          const pos = skillPos(ri, si, rs.length, t);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(pos.x, pos.y);
          ctx.strokeStyle = skill.color + "18";
          ctx.lineWidth = 0.5 * dpr;
          ctx.stroke();
          allPos.push({ skill, pos, ri });
        });
      });

      allPos.forEach(({ skill, pos, ri }) => drawNode(skill, pos, ri));
      drawCenter();

      t++;

      // Hover detection
      const mx = mouse.x * dpr;
      const my = mouse.y * dpr;
      let found: Skill | null = null;
      allPos.forEach(({ skill, pos, ri }) => {
        const baseR = (ri === 0 ? 21 : ri === 1 ? 18 : 15) * dpr;
        const dx = pos.x - mx;
        const dy = pos.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < baseR * 1.6) found = skill;
      });

      if (found !== hoveredSkill) {
        hoveredSkill = found;
        if (lbl) {
          lbl.style.opacity = found ? "1" : "0";
          if (found) lbl.textContent = (found as Skill).name + " · " + (found as Skill).pct + "%";
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const r = wrap!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        background: "transparent",
        overflow: "hidden",
        position: "relative",
        height: "100%",
        width: "100%",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "22px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          letterSpacing: "0.2em",
          color: "#ffffff",
          opacity: 0.9,
          zIndex: 2,
        }}
      >
        MY SKILLS · ACTIVE PROCESSES
      </div>

      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      <div
        ref={lblRef}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#e2e8f0",
          background: "rgba(168,85,247,0.12)",
          border: "1px solid rgba(168,85,247,0.25)",
          borderRadius: "20px",
          padding: "5px 16px",
          pointerEvents: "none",
          transition: "opacity 0.25s",
          opacity: 0,
          whiteSpace: "nowrap",
          zIndex: 2,
        }}
      />
    </div>
  );
}
