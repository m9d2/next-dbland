'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DraggableProps {
  minSize?: number;
  maxSize?: number;
  direction?: 'column' | 'row';
  size?: number;
  bgColor?: string;
}

const DraggableWrapper = styled.div<{
  direction: 'column' | 'row';
  size: number;
  bgcolor: string;
}>`
  position: relative;
  cursor: ${({ direction }) => (direction === 'row' ? 'col-resize' : 'row-resize')};
  height: 'inherit';

  &::after {
    content: '';
    position: absolute;
    top: ${({ direction }) => (direction === 'row' ? '0' : '100%')};
    left: ${({ direction }) => (direction === 'row' ? '100%' : '0')};
    width: ${({ direction, size }) => (direction === 'row' ? `${size}px` : '100%')};
    height: ${({ direction, size }) => (direction === 'column' ? `${size}px` : '100%')};
    z-index: 999;
    transition: background-color 0s;
  }

  &:hover::after {
    background: ${({ bgcolor }) => bgcolor};
    transition: background-color 0.5s;
  }

  &:active::after {
    background: ${({ bgcolor }) => bgcolor};
  }
`;

export default function Draggable({
  minSize,
  maxSize,
  direction = 'row',
  size = 4,
  bgColor = '#3498db',
}: DraggableProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const previousElement = useRef<HTMLElement | null>(null);
  const initialSize = useRef(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!draggableRef.current || e.target !== draggableRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    const prev = draggableRef.current.previousElementSibling;
    if (prev instanceof HTMLElement) {
      previousElement.current = prev;
      if (direction === 'row') {
        initialSize.current = prev.offsetWidth;
      }
      if (direction === 'column') {
        initialSize.current = prev.offsetHeight;
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !previousElement.current) return;

    let delta = 0;
    if (direction === 'row') {
      delta = e.clientX - startX.current;
    }
    if (direction === 'column') {
      delta = e.clientY - startY.current;
    }

    let newSize = initialSize.current + delta;
    if (maxSize && newSize >= maxSize) {
      newSize = maxSize;
    }
    if (minSize && newSize <= minSize) {
      newSize = minSize;
    }

    requestAnimationFrame(() => {
      if (previousElement.current) {
        if (direction === 'row') {
          previousElement.current.style.width = `${newSize}px`;
        }
        if (direction === 'column') {
          previousElement.current.style.height = `${newSize}px`;
        }
      }
    });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <DraggableWrapper ref={draggableRef} direction={direction} size={size} bgcolor={bgColor} />
  );
}
