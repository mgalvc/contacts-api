let db = require('./db');
let express = require('express');
let app = express();
let bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('Informations about contacts list');
});

//get all docs
app.get('/api', function(req, res) {
    db.getAll(res);
});

//get a specific doc
app.get('/api/:id', function(req, res) {
    db.getOne(res, req.params.id);
})

//add a contact
app.post('/api', function(req, res) {
    db.addContact(res, req.body);
});

app.listen(3000);
console.log('App listening on 3000');
