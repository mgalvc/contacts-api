let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myproject');

let contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A name is required']
    },
    phone : {
        type : String,
        required : [true, 'A phone is required']
    },
    email : String,
    age : Number
});

let Contact = mongoose.model('Contact', contactSchema);

//GET method
module.exports.getAll = function(res) {
    let contacts;
    Contact.find(function(err, c) {
        if (err) res.json(err);
        else res.status(200).json(c);
    });
}

//GET/id method
module.exports.getOne = function(res, id) {
    Contact.findById(id, function(err, c) {
        if (err) res.status(404).json({error : 'There is no contact matching the id ' + id});
        res.status(200).json(c);
    });
}

//POST method
module.exports.addContact = function(res, contact) {
    new Contact(contact).save(function(error) {
        if(error) {
            let errorsRes = {};
            for(let err in error.errors)
                errorsRes[err] = error.errors[err].message;
            res.status(400).json({ errors : errorsRes});
        } else
            res.status(201).json({created : contact});
    });
}

//PUT/id method
module.exports.updateContact = function(res, id, new_values) {
    let query = { _id : id };
    Contact.update(query, { $set : new_values }, function(err, contact) {
        if (err)
            res.status(404).json({ error : 'There is no contact matching the id ' + id});
        else if(contact.nModified === 0)
            res.status(304).json({ response : 'No contact was updated'});
        else
            Contact.findById(id, function(err, c) {
                res.status(200).json(c);
            });
    });
}

//DELETE/id method
module.exports.deleteContact = function(res, id) {
    Contact.remove({ _id : id }, function(err) {
        if (err)
            res.status(404).json({ error : 'There is no contact matching the id ' + id});

        res.json({ response : 'Deleted id ' + id});
    })
}
