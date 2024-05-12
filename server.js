const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');
const app = express();

app.use(clog);
//Parse json files in the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
)

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );


app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
)


app.listen(PORT, () => 
    console.log(`Note-Taker is listening at http://localhost:${PORT}`)
)