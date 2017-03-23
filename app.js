let db = require('./db');
let express = require('express');
let app = express();

app.get('/', function(req, res) {
    res.send('Informations about contacts list');
});

//get all docs
app.get('/api', function(req, res) {
    db.getAll(res);
});

app.listen(3000);
console.log('App listening on 3000');

/*db.addContact({
    name : 'Matheus',
    phone : '98363-9090',
    email : 'mgc@gmail.com',
    age : 18
});

db.getOne('58d2fba2818c42721b6dd845');

db.updateContact('58d2fba2818c42721b6dd845', { age : 30 });

db.getOne('58d2fba2818c42721b6dd845');*/
