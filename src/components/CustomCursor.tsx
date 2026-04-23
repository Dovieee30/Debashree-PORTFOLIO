import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const mousePos = useRef({ x: -40, y: -40 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let raf: number;
    const animate = () => {
      // Single ring snaps directly to cursor — clean, instant, Apple-like
      if (ringRef.current) {
        ringRef.current.style.left = mousePos.current.x + 'px';
        ringRef.current.style.top = mousePos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
