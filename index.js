/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postgres API' });
});
app.get('/arts', db.getArt);
app.get('/arts/search/:name', db.searchArt);
app.get('/arts/:id', db.getArtByID);
app.post('/arts', db.createArt);
app.put('/arts/:id', db.updateArt);
app.delete('/arts/:id', db.deleteArt);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});