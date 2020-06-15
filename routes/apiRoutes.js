const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

const db = "./db/db.json";

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
  //console.log(typeof notes);

  //create notes on request body
  const newNote = req.body;

  //add unique id number to each note
  newNote.id = uniqid();
  //console.log(newNote);

  //push new note to notes array
  notes.push(newNote);

  //write to db.json
  fs.writeFile(db, JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("New note has been created!");
  });

  //show new note to client upon save
  res.json(newNote);
});

// DELETE should receive note id query parameter, delete that ID, and rewrite notes to db.json
router.delete("/api/notes/:id", function (req, res) {
  //Delete note based on ID number chosen
  const chosenNote = req.params.id;
  //const chosenNote = parseInt(req.params.id);
  const notes = JSON.parse(fs.readFileSync(db, "utf8"));
  //iterate through notes array to find ID number chosen, then remove that element using the splice method
  for (let i = 0; i < notes.length; i++) {
    // console.log(typeof chosenNote, typeof notes[i].id);
    if (chosenNote === notes[i].id) {
      notes.splice(notes.indexOf(notes[i]), 1);
    }
  }

  //re-write notes to bd.json after removing chosen note from array
  fs.writeFile(db, JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("Note has been deleted!");
  });
  res.json(notes);
});

module.exports = router;
