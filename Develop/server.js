const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const PORT = 3001;
const util = require('util');
const { fileRead, readThenAppend } = require('./helpers/fsUtils');
const api = require("./routes/api")

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Defines route for API calls from Express
app.use("/api", api);


app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
