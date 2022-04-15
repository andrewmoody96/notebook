const express = require("express");
const app = express();
const notesJS = require("./notes");

app.use("/notes", notesJS);

module.exports = app;
