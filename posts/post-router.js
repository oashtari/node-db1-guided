const express = require('express');

// install knex and sqlite3

// database access using knex
const db = require('../data/db-config.js'); // CONNECTION TO THE DB

const router = express.Router();

router.get('/', (req, res) => {
    // get data from db
    // select * from posts
    db.select('*')
        .from('posts') // returns a promise
        .then(rows => {
            res.status(200).json({ data: rows })
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});

// router.get('/:id', (req, res) => {
//     db('posts')
//         // alternate way to write the .where 
//         // .where('id', '=', req.params.id)
//         .first() // grabs just the first element, can also write it with rows[0] in the then 200 statement
//         .where({ id: req.params.id })
//         .then(rows => { // you still get a collection back, even though it's just one item, always an array
//             res.status(200).json({ data: rows })
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'sorry, ran into an error' })
//         })
// });

// adding additional JS to only make sure there's an id with res 404

router.get('/:id', (req, res) => {
    db('posts')
        // alternate way to write the .where 
        // .where('id', '=', req.params.id)
        .where({ id: req.params.id })
        .first() // grabs just the first element, can also write it with rows[0] in the then 200 statement
        .then(post => {
            if (post) {
                res.status(200).json({ data: post })
            } else {
                res.status(404).json({ message: "post not found" })
            } // you still get a collection back, even though it's just one item, always an array
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});


router.post('/', (req, res) => {
    //shortcut to the table in the () after db
    // insert needs two arguments, the body and a string that is sent back, which is the last id
    // in postgres you have to say what you want back, not just id in string
    db('posts')
        .insert(req.body, 'id')
        // you get back an array, we're calling it ids
        .then(ids => {
            res.status(201).json({ results: ids })
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});

// almost identical to delete, just needs another argument
// you can send in only part of the object (the req body does not need all required fields), it'll change just that part
router.put('/:id', (req, res) => {
    const changes = req.body;
    db('posts')
        .where({ id: req.params.id })
        .update(changes) // needs two arguments
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "update success" })
            } else {
                res.status(404).json({ message: "post not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "argh error" })
        })
});

router.delete('/:id', (req, res) => {
    db('posts')
        .where({ id: req.params.id })
        .del() // delete the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "delete success" })
            } else {
                res.status(404).json({ message: "post not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "argh error" })
        })
});

module.exports = router;