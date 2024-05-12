const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
})
notes.post('/', (req, res) => {
    console.log('attempting POST request')
//make sure the request is good
    if (!req.body || !req.body.title || !req.body.text) {
        console.log('Title and text are required in the request body. POST request FAILED');
        return res.status(400).json({ error: 'Title and text are required in the request body. POST request FAILED' });
    }
//desctructure the request
    const { title, text } = req.body;
//add unique ID
    const newNote = {
        title,
        text,
        note_id: uuidv4(),
    };
//append to db.json for get requests
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully, note_id: ${newNote.note_id}`);
});

notes.delete('/:note_id', (req, res) => {
const noteId = req.params.note_id;
console.log(`attempting to delete note with ID: ${noteId}`);
readFromFile('./db/db.json')
    .then((data)=> JSON.parse(data))
    .then((json) => {
        const notesToKeep = json.filter((note) => note.note_id !== noteId);
        writeToFile('./db/db.json', notesToKeep);
        res.json(`Note: ${noteId} deleted succesfully`)
    })

});



module.exports = notes;