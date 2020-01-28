const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

let User = require('../model/user');
let Delivery = require('../model/delivery');

router.route('/').get((req, res) => {
    User.findOne({username: jwt.verify(req.headers.authorization.split(' ')[1], process.env.AXIOM_IV).username}, (err, doc) => {
        if (!err) {
            let query = {};
            if (!doc.isServer) query = {username: doc.username};
            Delivery.find(query, (err, deliverys) => {
                if (err) res.status(400).json(err);
                else res.json(deliverys);
            });
        } else {
            res.status(400).json(err);
        }
    });
});

router.route('/issue').post((req, res) => {
    let newDelivery = new Delivery(req.body);
    newDelivery.username = jwt.verify(req.headers.authorization.split(' ')[1], process.env.AXIOM_IV).username;
    newDelivery.status = 'issued';
    if (!newDelivery.dateExpect) newDelivery.dateExpect = new Date();
    newDelivery.save((err, doc) => {
        if (err) res.status(400).json(err);
        else res.json(doc);
    });
});

router.route('/issue').put((req, res) => {
    User.findOne({username: jwt.verify(req.headers.authorization.split(' ')[1], process.env.AXIOM_IV).username}, (err, doc) => {
        if (!err) {
            if (!doc.isServer) delete req.body.newData.status;
            Delivery.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.body.id)}, {$set: req.body.newData}, {useFindAndModify: false})
                    .then((doc) => {
                        Delivery.findOne({_id: doc._id})
                                .then((doc) => {res.json(doc)})
                                .catch((err) => {res.status(400).json(err)});
                    })
                    .catch((err) => {res.status(400).json(err)});
        } else {
            res.status(400).json(err);
        }
    });
});

module.exports = router;