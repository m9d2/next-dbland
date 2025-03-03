// electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      drawWindow: (x, y) => void;
      createChildWindow: (url: string) => void;
      enableWindowDragging: () => void;
      openContextMenu: (menus: any[]) => void;
      onContextMenuClick: (channel, callback) => void;
      removeListener: (channel, callback) => void;
    };
  }
}

export {};
