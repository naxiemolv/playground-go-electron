'use strict';

const ipcRenderer = require('electron').ipcRenderer;

// Trigger ping ipc event in node main loop.
var ping = document.querySelector('#ping');
ping.addEventListener('click', function () {
  ipcRenderer.send('ping');
});

ipcRenderer.on('pong', function (event, argument) {
  console.log('pong event with argument: ' + argument);
});

// Receive an ipc tick event from node main loop.
ipcRenderer.on('tick', function(event, argument) {
  console.log('tick event with argument: ' + argument);
});
