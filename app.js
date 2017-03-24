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

//update a contact
app.put('/api/:id', function(req, res) {
    db.updateContact(res, req.params.id, req.body);
})

//delete a contact
app.delete('/api/:id', function(req, res) {
    db.deleteContact(res, req.params.id);
})

app.listen(3000);
console.log('App listening on 3000');
