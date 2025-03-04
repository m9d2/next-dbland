import React, { FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';

interface DropdownProps {
  menus: any[];
  children?: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
                                       menus,
                                       children,
                                     }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);


  const onClick = () => {
    if (!dropdownRef.current) return;
    const rect = dropdownRef.current.getBoundingClientRect();
    const position = {
      x: rect.x,
      y: rect.y + rect.height + 8,
    };
    const newMenus = menus.map(({onClick, ...menuItem}) => {
      return {
        ...menuItem
      };
    });
    window.electronAPI.openContextMenu(newMenus, { x: Math.ceil(position.x), y: Math.ceil(position.y) });
  };

  const handleMenuClick = (item: any) => {
    menus.map((menuItem) => {
      if (menuItem.id === item.id) {
        menuItem.onClick?.();
      }
    });
  };

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onContextMenuClick(handleMenuClick);
    }
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeListener('context-menu-click');
      }
    };
  }, []);


  return (
    <div ref={dropdownRef} className={styles.dropdown} onClick={onClick}>
      {children}
    </div>
  );
};

export default Dropdown;
