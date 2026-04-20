'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import type { SpringOptions, MotionValue } from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { PanelType, DockProps } from '../types';
import { VscAccount, VscFiles, VscSettingsGear, VscTerminal, VscFile, VscMail } from 'react-icons/vsc';

import './Dock.css';

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
  { id: 'about', icon: <VscAccount size={24} color="#00c8ff" />, label: 'About' },
  { id: 'projects', icon: <VscFiles size={24} color="#a855f7" />, label: 'Projects' },
  { id: 'skills', icon: <VscSettingsGear size={24} color="#22c55e" />, label: 'Skills' },
  { id: 'terminal', icon: <VscTerminal size={24} color="#f59e0b" />, label: 'Terminal' },
  { id: 'resume', icon: <VscFile size={24} color="#3b82f6" />, label: 'Resume' },
  { id: 'contact', icon: <VscMail size={24} color="#fb7185" />, label: 'Contact' },
];

export default function Dock({
  activePanel,
  onIconClick,
  visible,
}: DockProps & { visible: boolean }) {
  const className = '';
  const spring: SpringOptions = { mass: 0.1, stiffness: 150, damping: 12 };
  const magnification = 70;
  const distance = 200;
  const panelHeight = 68;
  const dockHeight = 256;
  const baseItemSize = 50;

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
