import { useRef, useEffect, useState } from 'react';

const robotLines = [
  ' \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557 ',
  ' \u2551   \u25C9       \u25C9   \u2551 ',
  ' \u2551       \u25B2       \u2551 ',
  ' \u2551    \u2570\u2500\u2500\u2500\u2500\u2500\u256F    \u2551 ',
  ' \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D ',
  '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557',
  '\u2551                 \u2551',
  '\u2560\u2550\u2557    [D.M]    \u2554\u2550\u2563',
  '\u2551                 \u2551',
  '\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D',
  '   \u2551           \u2551   ',
  '  \u2550\u2569\u2550         \u2550\u2569\u2550  '
];

const CHAR_W = 8.4;
const LINE_H = 18;
const COLS = 19;
const ROWS = robotLines.length;
const TOTAL_RAIN = 140;
const rainChars = '\u2591\u2593\u2554\u2551\u2550\u25C9\u25B2\u2502\\/[]{}#@*^~';

interface TargetChar {
  x: number;
  y: number;
  char: string;
}

function buildTargets() {
  const targets: TargetChar[] = [];
  const eyeIndices: number[] = [];

  robotLines.forEach((line, row) => {
    let extraY = 0;
    if (row >= 5) extraY += 6;
    if (row >= 10) extraY += 4;

    for (let col = 0; col < line.length; col++) {
      const ch = line[col];
      if (ch !== ' ') {
        if (ch === '\u25C9') eyeIndices.push(targets.length);
        targets.push({
          x: (col - COLS / 2) * CHAR_W,
          y: (row - ROWS / 2) * LINE_H + extraY,
          char: ch
        });
      }
    }
  });

  return { targets, eyeIndices };
}

const { targets, eyeIndices } = buildTargets();

export default function Robot({ onReady }: { onReady: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [nameText, setNameText] = useState('');
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const charDivs: HTMLDivElement[] = [];
    const eyeDivs: { div: HTMLDivElement; baseX: number; baseY: number }[] = [];

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.40;

    // Position hero text below robot
    if (heroTextRef.current) {
      const robotBottom = cy + (ROWS / 2) * LINE_H + 10;
      heroTextRef.current.style.top = (robotBottom + 55) + 'px';
    }

    // STEP 1 — ASCII RAIN
    for (let i = 0; i < TOTAL_RAIN; i++) {
      const d = document.createElement('div');
      d.className = 'rain-char';
      d.textContent = rainChars[Math.floor(Math.random() * rainChars.length)];
      d.style.left = (Math.random() * window.innerWidth) + 'px';
      d.style.top = (Math.random() * window.innerHeight) + 'px';
      d.style.animationDuration = (3 + Math.random() * 3) + 's';
      d.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(d);
      charDivs.push(d);
    }

    // STEP 2 — ASSEMBLY (after 1.8s)
    const tAssembly = setTimeout(() => {
      charDivs.forEach((d, i) => {
        const rect = d.getBoundingClientRect();
        d.style.animation = 'none';
        d.style.left = rect.left + 'px';
        d.style.top = rect.top + 'px';
        d.style.transform = 'none';
        void d.offsetHeight; // force reflow

        if (i < targets.length) {
          const t = targets[i];
          const delay = Math.random() * 400;
          d.textContent = t.char;
          d.style.color = 'var(--cyan)';
          d.style.opacity = '1';
          d.style.transition =
            `left 0.8s ease-in-out ${delay}ms, ` +
            `top 0.8s ease-in-out ${delay}ms, ` +
            `opacity 0.5s ease-in-out ${delay}ms`;

          const finalX = cx + t.x - CHAR_W / 2;
          const finalY = cy + t.y;
          d.style.left = finalX + 'px';
          d.style.top = finalY + 'px';

          if (eyeIndices.includes(i)) {
            eyeDivs.push({ div: d, baseX: finalX, baseY: finalY });
          }
        } else {
          d.style.transition = 'opacity 0.6s ease-out';
          d.style.opacity = '0';
          setTimeout(() => d.remove(), 800);
        }
      });
    }, 1800);

    // STEP 3 — BREATHING + EYES (2.6s mark = 1.8s + 0.8s)
    const eyeHandler = (e: MouseEvent) => {
      eyeDivs.forEach(({ div, baseX, baseY }) => {
        const ecx = baseX + CHAR_W / 2;
        const ecy = baseY + LINE_H / 2;
        const dx = e.clientX - ecx;
        const dy = e.clientY - ecy;
        const ang = Math.atan2(dy, dx);
        const dist = Math.min(3, Math.hypot(dx, dy) / 80 * 3);
        div.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
      });
    };

    const tBreathing = setTimeout(() => {
      for (let i = 0; i < targets.length; i++) {
        if (charDivs[i]) {
          charDivs[i].style.transition = 'none';
          charDivs[i].classList.add('breathing');
        }
      }
      document.addEventListener('mousemove', eyeHandler);
    }, 1800 + 800);

    // STEP 4 — TYPEWRITER (2.8s mark = 1.8s + 1.0s)
    let typeInterval: ReturnType<typeof setInterval>;
    const tTypewriter = setTimeout(() => {
      if (heroTextRef.current) heroTextRef.current.style.opacity = '1';

      const fullName = 'D E B A S H R E E          M A L';
      let idx = 0;
      typeInterval = setInterval(() => {
        if (idx < fullName.length) {
          const char = fullName[idx];
          setNameText(prev => prev + char);
          idx++;
        } else {
          clearInterval(typeInterval);
          // Show subtitle after 300ms
          setTimeout(() => setSubtitleVisible(true), 300);
          // Signal dock/menubar after ~700ms more
          setTimeout(() => onReady(), 700);
        }
      }, 100);
    }, 1800 + 1000);

    return () => {
      clearTimeout(tAssembly);
      clearTimeout(tBreathing);
      clearTimeout(tTypewriter);
      clearInterval(typeInterval);
      document.removeEventListener('mousemove', eyeHandler);
      // Clean up rain chars
      charDivs.forEach(d => { if (d.parentNode) d.remove(); });
    };
  }, [onReady]);

  return (
    <>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      <div
        className="hero-text"
        ref={heroTextRef}
        style={{ opacity: 0, transition: 'opacity 0.5s' }}
      >
        <h1 className="hero-name">{nameText}</h1>
        <p
          className="hero-subtitle"
          style={{ opacity: subtitleVisible ? 1 : 0 }}
        >
          Computer Engineer · Builder
        </p>
      </div>
    </>
  );
}
