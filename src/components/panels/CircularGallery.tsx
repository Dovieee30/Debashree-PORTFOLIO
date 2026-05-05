import React, { useRef, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import './CircularGallery.css';

export const CircularGalleryItem = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`circular-gallery-item ${className}`}>
      {children}
    </div>
  );
};

interface CircularGalleryProps {
  children: React.ReactNode;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  onActiveIndexChange?: (index: number) => void;
}

export default function CircularGallery({
  children,
  bend = 3,
  onActiveIndexChange
}: CircularGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const items = Array.from(scroller.querySelectorAll('.circular-gallery-item')) as HTMLDivElement[];
    itemsRef.current = items;

    // Use Lenis for smooth scrolling
    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.circular-gallery-inner') as HTMLElement,
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    const updateTransforms = () => {
      const scrollLeft = scroller.scrollLeft;
      const containerWidth = scroller.clientWidth;
      const H = containerWidth / 2;
      const centerScroll = scrollLeft + H;

      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, i) => {
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const itemCenter = itemLeft + itemWidth / 2;
        
        // Distance from center of viewport
        const x = itemCenter - centerScroll;
        
        // Find active index
        if (Math.abs(x) < minDistance) {
          minDistance = Math.abs(x);
          closestIndex = i;
        }

        let y = 0;
        let rotationZ = 0;

        if (bend !== 0) {
          // Map bend=3 to a noticeable pixel curve. 
          // max_y is the vertical displacement at the edge of the container
          const max_y = bend * 10; // reduced from 30 for a subtle, more horizontal curve
          
          // Parabola y = a * x^2
          const a = max_y / (H * H);
          y = a * x * x;
          
          const dy_dx = 2 * a * x;
          const angle = Math.atan(dy_dx);
          rotationZ = angle * (180 / Math.PI);
        }
        
        // Apply transform
        // We set will-change: transform in CSS for performance
        item.style.transform = `translate3d(0, ${y}px, 0) rotateZ(${rotationZ}deg)`;
      });

      // Update active index
      if (onActiveIndexChange) {
        onActiveIndexChange(closestIndex);
      }
    };

    lenis.on('scroll', updateTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      updateTransforms(); // Need to call this continuously to handle native scroll changes
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    // Initial call
    updateTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [bend, onActiveIndexChange]);

  return (
    <div className="circular-gallery-scroller" ref={scrollerRef}>
      <div className="circular-gallery-inner">
        {children}
        {/* Empty spacer to allow the last item to reach the center */}
        <div style={{ flex: '0 0 10%', width: '10%' }} />
      </div>
    </div>
  );
}
