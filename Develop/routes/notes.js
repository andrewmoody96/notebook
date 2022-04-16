const express = require('express');
const notes = express.Router();
const db = require('../db/db.json');
const idGen = require('../helpers/idGen');


notes.get('/', (req, res) => {
    console.log('Request Received');
    readFromFile('./db/db.json'.then((data) => res.json(JSON.parse(data))));
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


module.exports = notes;