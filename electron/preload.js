/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => {
    console.log('Received message:', message);
  }, 
  dragWindow: (x, y) => {
    ipcRenderer.send('drag-window', x, y);
  }, 
  createChildWindow: (url) => {
    ipcRenderer.send('create-child-window', url);
  },
  openContextMenu: (menus, position) => {
    console.log('openContextMenu', menus, position);
    ipcRenderer.send('open-context-menu', menus, position);
  },
  onContextMenuClick: (callback) => {
    ipcRenderer.on('context-menu-click', (event, data) => {
      callback(data);
    });
  }, 
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
  getClickPosition: () => ipcRenderer.invoke('get-click-position'), removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
  getPlatform: async () => ipcRenderer.invoke('get-platform'),
});
