const express = require("express");
const router = express.Router();
const fs = require("fs");

const db = "./db/db.json";

// application data using stubbing
// const notes = [
//   {
//     title: "Test Note",
//     text: "I am a note!",
//   },
// ];

// api routes...send and receive data

//GET needs to read db.json and return all saved notes as JSON
router.get("/api/notes", function (req, res) {
  //read db.json
  const notes = JSON.parse(fs.readFileSync(db, "utf8"));

  res.json(notes);
});

//POST needs to receive new note to save on request body, add to db.json and return new note to client. Give note ID number.
router.post("/api/notes", function (req, res) {
  // get notes from db.json
  const notes = JSON.parse(fs.readFileSync(db, "utf8"));

  //create notes on request body
  const newNote = req.body;
  //increment to add unique id number to each note
  if (notes.length === 0) {
    newNote.id = notes.length + 1;
  } else {
    newNote.id = notes[notes.length - 1].id + 1;
  }

  //push new note to notes array
  notes.push(newNote);

  //write to db.json
  fs.writeFile(db, JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("New note has been created!");
  });

  //show new note to client upon save
  res.json(notes);
});

// DELETE should receive note id query parameter, delete that ID, and rewrite notes to db.json
router.delete("/api/notes/:id", function (req, res) {
  //re-write to bd.json
  // fs.writeFile(db, ,)
  res.json(notes);
});

module.exports = router;
