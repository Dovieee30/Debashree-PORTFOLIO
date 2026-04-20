import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const mousePos = useRef({ x: -40, y: -40 });
  const cursorPos = useRef({ x: -40, y: -40 });

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
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.left = cursorPos.current.x + 'px';
        cursorRef.current.style.top = cursorPos.current.y + 'px';
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
      className="custom-cursor"
      ref={cursorRef}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
