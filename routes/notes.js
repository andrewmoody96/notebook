const express = require('express');
const notes = express.Router();
const db = require('../db/db.json');
const idGen = require('../helpers/idGen');
const { fileRead, readThenAppend, fileWrite} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    console.info(`${req.method} Request Received`);
    fileRead('./db/db.json'.then((data) => res.json(JSON.parse(data))));
});

notes.post('/', (req, res) => {
    console.log('Adding note');
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: idGen(),
        };
        readThenAppend(newNote, './db/db.json');
        const response = {
            status: 'Saved',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error while trying to save note.');
    }
});

notes.get('/:note_id', (req, res) => {
    if (req.params.note_id) {
        console.log("Showing note with selected ID.")
        const noteID = req.params.note_id;
        for (let i = 0; i < db.length; i++) {
            const currentNote = db[i];
            if (currentNote.note_id === noteID) {
                res.json(currentNote);
                return;
            };
        };
        res.status(404).send('No notes matching selected ID.');
    } else {
        res.status(404).send('No ID provided.')
    };
});

let newDB = [];

notes.delete('/:note_id', (req, res) => {
    //something
    if (req.params.note_id) {
        console.info(`${req.method} request received to delete a note`);
        const noteID = req.params.note_id;
        newDB = db.filter(note => note.note_id !== noteID)
        console.info(db);
        console.info(newDB);
        fileWrite('./db/db.json', newDB);
        res.json(db);
        return;
    } else {
        res.status(400).send('Note ID not provided');
    };
});

module.exports = notes;