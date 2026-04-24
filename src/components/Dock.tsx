'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import type { SpringOptions, MotionValue } from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { PanelType, DockProps } from '../types';
import './Dock.css';

// Generic Lord Icon wrapper for the dock
function DockLordIcon({ src, trigger, stroke, state, delay, colors }: {
  src: string;
  trigger: string;
  stroke?: string;
  state?: string;
  delay?: string;
  colors?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('lord-icon')) {
      const lordIcon = document.createElement('lord-icon');
      lordIcon.setAttribute('src', src);
      lordIcon.setAttribute('trigger', trigger);
      if (stroke) lordIcon.setAttribute('stroke', stroke);
      if (state) lordIcon.setAttribute('state', state);
      if (delay) lordIcon.setAttribute('delay', delay);
      lordIcon.setAttribute('colors', colors || 'primary:#ffffff,secondary:#e4e4e4');
      lordIcon.setAttribute('style', 'width:28px;height:28px');
      containerRef.current.appendChild(lordIcon);
    }
  }, []);

  return <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
}

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  isActive?: boolean;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, isActive }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <div className="dock-item-wrapper">
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size
        }}
        onHoverStart={() => isHovered.set(1)}
        onHoverEnd={() => isHovered.set(0)}
        onFocus={() => isHovered.set(1)}
        onBlur={() => isHovered.set(0)}
        onClick={onClick}
        className={`dock-item ${className}`}
        data-active={isActive ? "true" : "false"}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
      >
        {Children.map(children, child => {
          if (React.isValidElement<{ isHovered: MotionValue<number> }>(child)) {
            return cloneElement(child, { isHovered });
          }
          return child;
        })}
      </motion.div>
      
      {/* macOS style active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="dock-active-dot" 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: MotionValue<number>;
}

function DockLabel({ children, className = '', ...rest }: DockLabelProps) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: MotionValue<number>;
}

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

interface Item {
  id: PanelType;
  icon: React.ReactNode;
  label: string;
}

const ITEMS: Item[] = [
  { id: 'about', icon: <DockLordIcon src="https://cdn.lordicon.com/lhjjdftm.json" trigger="loop" delay="100" stroke="bold" state="in-reveal" />, label: 'About' },
  { id: 'projects', icon: <DockLordIcon src="https://cdn.lordicon.com/tsrgicte.json" trigger="loop" delay="200" stroke="bold" />, label: 'Projects' },
  { id: 'skills', icon: <DockLordIcon src="https://cdn.lordicon.com/nfuackpv.json" trigger="loop" delay="300" stroke="bold" state="loop-spin" />, label: 'Skills' },
  { id: 'terminal', icon: <DockLordIcon src="https://cdn.lordicon.com/ailnzwyn.json" trigger="loop" delay="400" stroke="bold" state="in-reveal" />, label: 'Terminal' },
  { id: 'resume', icon: <DockLordIcon src="https://cdn.lordicon.com/hmpomorl.json" trigger="loop" delay="500" stroke="bold" />, label: 'Resume' },
  { id: 'contact', icon: <DockLordIcon src="https://cdn.lordicon.com/vpbspaec.json" trigger="loop" delay="600" stroke="bold" state="in-unfold" />, label: 'Contact' },
];

export default function Dock({
  activePanel,
  onIconClick,
  visible,
}: DockProps & { visible: boolean }) {
  const className = '';
  const spring: SpringOptions = { mass: 0.1, stiffness: 200, damping: 15 };
  const magnification = 70;
  const distance = 180;
  const panelHeight = 64;
  const dockHeight = 256;
  const baseItemSize = 46;

  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div 
      style={{ height, scrollbarWidth: 'none' }} 
      className={`dock-outer ${visible ? 'dock-visible' : ''}`}
    >
      <motion.div
        onMouseMove={(e: React.MouseEvent) => {
          isHovered.set(1);
          mouseX.set(e.pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {ITEMS.map((item, index) => (
          <React.Fragment key={item.id ?? index}>
            <DockItem
              onClick={() => onIconClick(item.id)}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
              isActive={activePanel === item.id}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          </React.Fragment>
        ))}
      </motion.div>
    </motion.div>
  );
}
