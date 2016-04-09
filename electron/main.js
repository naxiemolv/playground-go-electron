'use strict';

// Load shared Go libserver.{so,dylib,dll} library.
const ffi = require('ffi');
const server = ffi.Library(__dirname + '/../libserver', {
  'ticker': ['void', ['pointer']],
  'ping':   ['string', []]
});

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain       = electron.ipcMain;

let mainWindow;

function ticker_callback(argument) {
  if (mainWindow !== null) {
    mainWindow.webContents.send('tick', argument);
  }
}

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/view/index.html');
  mainWindow.webContents.openDevTools();

  var ticker_callback_ptr = ffi.Callback('void', ['string'], ticker_callback);
  server.ticker(ticker_callback_ptr);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// On ipc ping event from view button call Go ping.
ipcMain.on('ping', function () {
  // Don't block main libuv event loop waiting for Go.
  server.ping.async(function(err, result) {
    if (mainWindow !== null)
      mainWindow.webContents.send('pong', result);
  });
});
