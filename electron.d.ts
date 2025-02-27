// electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      createChildWindow: (url: string) => void;
      enableWindowDragging: () => void;
    };
  }
}

export {};
