import { useState, useEffect } from 'react';

export default function MenuBar({ visible }: { visible: boolean }) {
  const [time, setTime] = useState('🕐 --:--');

  useEffect(() => {
    const updateClock = () => {
      const n = new Date();
      let h = n.getHours();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`🕐 ${String(h).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')} ${ampm}`);
    };
    updateClock();
    const t = setInterval(updateClock, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <nav className={`menubar ${visible ? 'menubar-visible' : ''}`}>
      <div className="menubar-left">
      </div>
      <div className="menubar-right">
        <span className="item">🟢 Open to Work</span>
        <span className="divider"></span>
        <span className="item clock">{time}</span>
      </div>
    </nav>
  );
}
