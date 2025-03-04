import { useEffect, useState } from 'react';

interface MenuItem {
  label: string;
  id: string;
}

const useContextMenu = () => {
  const [menuClickData, setMenuClickData] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleMenuClick = (data: MenuItem) => {
      setMenuClickData(data);
    };
    // window.electronAPI.onContextMenuClick('context-menu-click', handleMenuClick);
    return () => {
      window.electronAPI.removeListener('context-menu-click');
    };
  }, []);

  const openMenu = (menus: { label: string, id: string }[]) => {
    // window.electronAPI.openContextMenu(menus);
  };

  return { openMenu, menuClickData };
};

export default useContextMenu;