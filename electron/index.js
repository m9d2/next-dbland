/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow, BaseWindow, ipcMain, Menu, screen, nativeImage } = require('electron');
const path = require('path');
let mainWindow;

/**
 * create main window
 */
const baseUrl = `http://localhost:3000`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 908,
    height: 675,
    vibrancy: 'under-window',
    ...(process.platform === 'darwin' ?
      {
        titleBarStyle: 'hidden',
        frame: false,
      } :
      {
        titleBarOverlay: {
          color: '#e9e7e7',
          symbolColor: '#000',
        }
      }),
    webPreferences: {
      nodeIntegration: false, contextIsolation: true, preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(baseUrl).then(r => {
  });

  // 打开开发者工具 (可选)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('drag-window', (event, { x, y }) => {
    console.log('drag-window', x, y);
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      win.setPosition(x, y);
    }
  });

  ipcMain.handle('get-current-window', (event) => {
    return BrowserWindow.fromWebContents(event.sender);
  });

  ipcMain.handle('get-platform', async () => {
    return process.platform;
  });

  ipcMain.on('create-child-window', (event, url) => {
    createChildWindow(baseUrl + '/' + url);
  });

  ipcMain.handle('get-click-position', async (event) => {
    return screen.getCursorScreenPoint();
  });

  ipcMain.on('open-context-menu', (event, menus, position) => {
    menus.forEach(item => {
      // item.icon = nativeImage.createFromPath('/Users/gaoyang/Workspace/web/next-dbland/electron/1.png');
    })

    console.log(menus);
    const menu = Menu.buildFromTemplate(menus);
    menu.items.forEach(item => {
      item.click = () => {
        event.sender.send('context-menu-click', { id: item.id, label: item.label });
      };
    });
    menu.popup({ window: mainWindow, ...(position || {} )});
  });
}

/**
 * create child window
 */
function createChildWindow(url) {
  const childWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: mainWindow,
    maximizable: false,
    minimizable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, contextIsolation: false,
    },
  });

  childWindow.loadURL(url);

  childWindow.on('closed', () => {
    console.log('Child window closed');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
