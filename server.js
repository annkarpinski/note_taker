// import dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// create am express server
var app = express();

// define port where server will listen in prod or locally
var PORT = process.env.PORT || 8080;

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//needed to look into Public folder for static CSS and JS
app.use(express.static("./public"));

// html routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// api routes...send and receive data
app.get("/api/notes", function (req, res) {
  res.json(notes);
});

app.post("/api/notes", function (req, res) {
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  res.json(notes);
});

// start the server
app.listen(PORT, function () {
  console.log("server is listening on http://localhost:" + PORT);
});
