// electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      drawWindow: (x, y) => void;
      createChildWindow: (url: string) => void;
      openContextMenu: (menus: any[], position?: { x: number, y: number}) => void;
      onContextMenuClick: (callback) => void;
      removeListener: (channel) => void;
      getPlatform: () => Promise<string>;
      getClickPosition: () => Promise<{
        x: number;
        y: number;
      }>;
    };
  }
}

export {};
