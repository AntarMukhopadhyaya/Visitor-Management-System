// Importing required library
const electron = require("electron");
const path = require("path");
const url = require("url");

const { tittle } = require("process");
const { protocol } = require("electron");
let server = require("./config/server.js");

const BrowserWindow = electron.BrowserWindow;

const { app, Menu, ipcMain } = electron;
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Initializing Window Varibles.
let mainWindow;
let contactWindow;
let addVisitorWindow;
let visitorWindow;
let dialogWindow;
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Settting ENV mode
// process.env.NODE_ENV = "production";

/* --------------- ---------------------------------------- ----------------------------------------- -*/

// When App is Ready
app.on("ready", function () {
  // Creating Main Window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,

      worldSafeExecuteJavaScript: true,
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  /* --------------- ---------------------------------------- ----------------------------------------- -*/
  // When Mainmenu is Closed

  mainWindow.on("closed", function () {
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Create contact Window

function createContactWindow() {
  contactWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  contactWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/contact.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // garbage collection
  contactWindow.on("close", function () {
    contactWindow == null;
  });
}
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Add Visitor Window create

function createAddVisitorWindow() {
  addVisitorWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  addVisitorWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/addVisitor.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // Garbage collection
  addVisitorWindow.on("close", function () {
    addVisitorWindow == null;
  });
}
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Visitor Window Create
function createVisitorWindow() {
  visitorWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  visitorWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/visitors.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // Garbage collection
  visitorWindow.on("close", function () {
    visitorWindow == null;
  });
}

/* --------------- ---------------------------------------- ----------------------------------------- -*/
function appQuiter() {
  app.quit();
}

/* --------------- ---------------------------------------- ----------------------------------------- -*/

// main Menu Template

const mainMenuTemplate = [
  {
    label: "Contact",
    click() {
      createContactWindow();
    },
  },
  {
    label: "Exit",
    click() {
      appQuiter();
    },
  },

  {
    label: "Visitors",
    submenu: [
      {
        label: "Add Visitor",
        click() {
          createAddVisitorWindow();
        },
      },
      {
        label: "Visitors",
        click() {
          createVisitorWindow();
        },
      },
    ],
  },
];
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Add Developer Tools if not in production

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle Dev Tools",
        accelerator: process.platform == "darwin" ? "COMMAND+I" : "CTRL+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
        accelerator: process.platform == "darwin" ? "COMMAND+R" : "CTRL+R",
      },
    ],
  });
}
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Catch The details FROM  Contact

ipcMain.on("name:submit", function (e, name) {
  console.log(name);
});

ipcMain.on("email:submit", function (e, email) {
  console.log(email);
});

ipcMain.on("message:submit", function (e, message) {
  console.log(message);
});
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// Catch The details FROM  Contact

ipcMain.on("name:submit  ", function (e, name) {});

ipcMain.on("phone:submit", function (e, phone) {});

ipcMain.on("gender:submit", function (e, gender) {});
ipcMain.on("designation:submit", function (e, designation) {});

ipcMain.on("message:submit", function (e, message) {});
/* --------------- ---------------------------------------- ----------------------------------------- -*/
// If Mac Os Then add an Empty Object to mainMenuTemplate

if (process.platform == "darwin ") {
  mainMenuTemplate.unshift({});
}
