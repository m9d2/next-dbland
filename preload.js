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
  openContextMenu: ( menus) => {
    ipcRenderer.send('open-context-menu', menus);
  },
  onContextMenuClick: (callback) => {
    ipcRenderer.on('context-menu-click', (event, data) => {
      callback(data);
    });
  },
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
  enableWindowDragging: () => {
    const titleBar = document.getElementById('titleBar');
    if (titleBar) {
      let isMove = false;
      let offsetX = 0;
      let offsetY = 0;
      titleBar.addEventListener('mousedown', async (event) => {
        isMove = true;
        const win = await ipcRenderer.invoke('get-current-window');
        const [currentX, currentY] = win.getPosition();
        offsetX = event.screenX - currentX;
        offsetY = event.screenY - currentY;
      });

      titleBar.addEventListener('mouseup', () => {
        console.log('Mouse up');
        isMove = false;
      });

      titleBar.addEventListener('mouseleave', () => {
        console.log('Mouse leave');
        // isMove = false;
      });

      titleBar.addEventListener('mousemove', (event) => {
        if (isMove) {
          const newX = event.screenX - offsetX;
          const newY = event.screenY - offsetY;
          console.log('Mouse move at', newX, newY);
          // ipcRenderer.send('drag-window', { x: newX, y: newY });
        }
      });
    }
  },
});
