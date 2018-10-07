//const electron = require('electron');
// console.log(Object.keys(electron));
const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  console.log('### Ready');
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  require('devtron').install();
});

