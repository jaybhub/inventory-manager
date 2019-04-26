// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/inventory");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Item = mongoose.model('Item', {
    name: String,
    description: String
});


// Get all items in description list
app.get('/api/inventory', function (req, res) {

    console.log("Listing all items...");

    //use mongoose to get all items in the database
    Item.find(function (err, items) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(items); // return all items in JSON format
    });
});

// Create an item
app.post('/api/inventory', function (req, res) {

    console.log("Creating item...");

    Item.create({
        name: req.body.name,
        description: req.body.description,
        done: false
    }, function (err, item) {
        if (err) {
            res.send(err);
        }

        // create and return all the items
        Item.find(function (err, items) {
            if (err)
                res.send(err);
            res.json(items);
        });
    });

});

// Update an item
app.put('/api/inventory/:id', function (req, res) {
    const item = {
        name: req.body.name,
        description: req.body.description
    };
    console.log("Updating item - ", req.params.id);
    Item.update({_id: req.params.id}, item, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete an item
app.delete('/api/inventory/:id', function (req, res) {
    Item.remove({
        _id: req.params.id
    }, function (err, item) {
        if (err) {
            console.error("Error deleting item ", err);
        }
        else {
            Item.find(function (err, items) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(items);
                }
            });
        }
    });
});


// Start app and listen on port 8888  
app.listen(process.env.PORT || 8888);
console.log("Inventory server listening on port  - ", (process.env.PORT || 8888));