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
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'Saved',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error while trying to save note.');
    }
});


module.exports = notes;