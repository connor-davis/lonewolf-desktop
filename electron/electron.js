let dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

let path = require('path');
let { app, Menu, ipcMain, clipboard } = require('electron');
let {
  createWindow,
  defineWindow,
  getWindow,
  closeAllWindows,
} = require('./electronWindows');
let { autoUpdater } = require('electron-updater');

let IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
let MAIN_WINDOW_ID = 'main';

let fs = require('fs');

if (!fs.existsSync(path.join(process.cwd(), 'temp')))
  fs.mkdirSync(path.join(process.cwd(), 'temp'));

/**
 * Creates a window for the main application.
 * @returns {Window}
 */
function createMainWindow() {
  let windowOptions = {
    width: 1280,
    height: 720,
    minWidth: 900,
    minHeight: 480,
    show: false,
    center: true,
    autoHideMenuBar: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    transparent: true,
    // resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: app.name,
    icon: IS_DEVELOPMENT
      ? 'http://localhost:3000/icon.png'
      : path.join(__dirname, 'build', 'icon.png'),
  };
  return createWindow(MAIN_WINDOW_ID, windowOptions);
}

/**
 * Creates a window for the splash screen.
 * This uses a dedicated webpack entry point so it loads fast.
 * @returns {Electron.BrowserWindow}
 */
function createSplashWindow() {
  let windowOptions = {
    width: 400,
    height: 200,
    resizable: false,
    autoHideMenuBar: true,
    frame: false,
    show: true,
    center: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    transparent: true,
    title: app.name,
  };
  let window = defineWindow('splash', windowOptions);

  if (IS_DEVELOPMENT) {
    window.loadURL('http://localhost:3000/splash.html').then();
  } else {
    window.loadURL(`file://${path.join(__dirname, '/splash.html')}`).then();
  }

  return window;
}

// attach process logger

process.on('uncaughtException', (err) => {
  console.error(err);
  closeAllWindows();
});

// build menu

let menuTemplate = [
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        },
      },
    ],
  },
];
let menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// prevent multiple instances of the main window

app.requestSingleInstanceLock();

app.on('second-instance', () => {
  let window = getWindow(MAIN_WINDOW_ID);
  if (window) {
    if (window.isMinimized()) {
      window.restore();
    }
    window.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  let window = getWindow(MAIN_WINDOW_ID);
  if (window === null) {
    createMainWindow();
  }
});

// create main BrowserWindow with a splash screen when electron is ready
app.on('ready', () => {
  let splashWindow = createSplashWindow();
  let mainWindow = createMainWindow();

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splashWindow.close();
      mainWindow.show();
    }, 300);
  });
});

/**
 * Auto Updater
 */

autoUpdater.on('checking-for-update', () => {});

autoUpdater.on('update-available', (info) => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', (info) => {});

autoUpdater.on('error', (err) => {});

autoUpdater.on('download-progress', (progressObj) => {});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('minimize', (_) => {
  getWindow(MAIN_WINDOW_ID).minimize();
});

ipcMain.on('toggleMaximize', (event) => {
  if (getWindow(MAIN_WINDOW_ID).isMaximized())
    getWindow(MAIN_WINDOW_ID).unmaximize();
  else getWindow(MAIN_WINDOW_ID).maximize();

  event.reply('toggledMaximize', getWindow(MAIN_WINDOW_ID).isMaximized());
});

ipcMain.on('close', (event) => {
  event.reply('setOffline');
});

ipcMain.on('offlineSet', (_) => {
  console.log('you can close');
  getWindow(MAIN_WINDOW_ID).close();
  app.quit();
});

ipcMain.on('center', (_) => {
  getWindow(MAIN_WINDOW_ID).center();
});

ipcMain.on('resizable', (_, value) => {
  getWindow(MAIN_WINDOW_ID).setResizable(value);
});
