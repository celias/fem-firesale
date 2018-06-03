// main.js is the "main process" action is here
// renderer.js is where I trigger the UI

// Modules from Electron Lib
const { app, BrowserWindow, dialog } = require('electron');
// File System library from Node 
const fs = require('fs');

let mainWindow = null;

// you could also use module.exports = {}
const getFileFromUserSelection = exports.getFileFromUserSelection = () => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties:['openFile'], 
    filters: [
      { name: 'Text Files', extensions: ['txt', 'text']},
      { name: 'Markdown Files', extensions: ['md', 'markdown']}
    ]
  });

  if (!files) return; // if the user hits cancel then don't blow up
  
  const file = files[0]; // get the first out of the array
  const content = fs.readFileSync(file).toString();

  // console.log(content);
  // grab the content and send to the renderer process
  // sending messages to the renderer process
  mainWindow.webContents.send('file-opened', file, content);
};

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });
  
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // getFileFromUserSelection();
  });
  


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
