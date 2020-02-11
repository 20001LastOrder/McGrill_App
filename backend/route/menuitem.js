const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let Restaurant = require('../model/restaurant');
let MenuItem = require('../model/menuitem');

router.route('/create').post((req, res) => {
    new MenuItem(req.body).save(function(err,doc) {
        if(err) res.status(400).json(err);
        else res.status(201).json(doc);
    }
);

router.route('/update').put((req, res) => {
        MenuItem.findOneAndUpdate(query, {$set: req.body.newData}, {useFindAndModify: false})
        .then((doc) => {
            MenuItem.findOne({_id: doc._id}).then((doc) => {res.json(doc)})
            .catch((err) => {res.status(400).json(err)});
        })
        .catch((err) => {res.status(400).json(err)});
    });
});

module.exports = router;