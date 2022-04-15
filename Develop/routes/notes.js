const express = require('express');
const notes = express.Router();
const db = require('../db/db.json');


notes.get('/', (req, res) => {
    console.log('Request Received');
    readFromFile('./db/db.json'.then((data) => res.json(JSON.parse(data))));
});