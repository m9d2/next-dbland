/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow, BaseWindow, ipcMain, Menu, screen } = require('electron');
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
    frame: false,
    vibrancy: 'under-window',
    // remove the default titlebar
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false, contextIsolation: true, preload: path.join(__dirname, 'preload.js'),
    },
  });

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

  ipcMain.on('create-child-window', (event, url) => {
    createChildWindow(baseUrl + '/' + url);
  });

  ipcMain.handle('get-click-position', async (event) => {
    return screen.getCursorScreenPoint();
  });

  ipcMain.on('open-context-menu', (event, menus, position) => {
    const { x, y } = position;
    const menu = Menu.buildFromTemplate(menus);
    menu.items.forEach(item => {
      item.click = () => {
        event.sender.send('context-menu-click', { id: item.id, label: item.label });
      };
    });
    menu.popup({ window: mainWindow, x, y });
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
