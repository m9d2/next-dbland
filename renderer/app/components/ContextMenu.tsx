'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface MenuItem {
  label?: string;
  icon?: ReactNode;
  action?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  items: MenuItem[];
  children: ReactNode;
}

export default function ContextMenu({ items, children }: ContextMenuProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setPosition(adjustPosition(clientX, clientY));
    setVisible(true);
  };

  const adjustPosition = (x: number, y: number) => {
    const menuWidth = menuRef.current?.offsetWidth || 0;
    const menuHeight = menuRef.current?.offsetHeight || 0;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return {
      x: x + menuWidth > windowWidth ? windowWidth - menuWidth - 10 : x,
      y: y + menuHeight > windowHeight ? windowHeight - menuHeight - 10 : y,
    };
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {visible && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider && <div className="divider" />}
              <button
                className={`menu-item ${item.disabled ? 'disabled' : ''}`}
                onClick={() => {
                  item.action?.();
                  setVisible(false);
                }}
                disabled={item.disabled}
              >
                {item.icon && <span className="icon">{item.icon}</span>}
                <span className="label">{item.label}</span>
              </button>
            </div>
          ))}
          <style jsx>{`
            .context-menu {
              position: fixed;
              background: rgba(221, 221, 229, 0.3);
              backdrop-filter: blur(20px);
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              padding: 6px 6px;
              z-index: 1000;
              border: 1px solid rgba(0, 0, 0, 0.1);
            }

            .menu-item {
              display: flex;
              align-items: center;
              width: 100%;
              padding: 4px 12px;
              background: transparent;
              border: none;
              font-size: 12px;
              color: #333;
              cursor: pointer;
              transition: background 0.2s;
            }

            .menu-item:hover {
              border-radius: 4px;
              color: #fff;
              background: rgba(62, 146, 252);
            }

            .menu-item.disabled {
              color: #999;
              cursor: not-allowed;
            }

            .icon {
              margin-right: 8px;
              width: 16px;
              height: 16px;
              display: flex;
              align-items: center;
            }

            .divider {
              height: 1px;
              background: rgba(0, 0, 0, 0.1);
              margin: 6px 0;
            }

            .label {
              flex: 1;
              text-align: left;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
