const mongoose = require('mongoose');
const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let Admin = require('../model/admin');

router.route('/').get((req, res) => {
    Admin.find()
        .then(admins => {
            admins.map((admin) => {
                admin.password = null;
            });
            res.json(admins);
        })
        .catch(err => res.status(400).json(err));
});

router.route('/login').get((req, res) => {
    if (!req.headers.email || !req.headers.password) {
        res.status(400).json("bad request");
        return
    }
    Admin.findOne({email: req.headers.email}, (err, admin) => {
        if (admin !== null) {
            admin.comparePassword(req.headers.password, (err, isMatch) => {
                if (err) return res.status(400).json(err);
                if (!isMatch) return res.status(401).json("Password Not Correct");
                let token = jsonwebtoken.sign({username: req.headers.email}, process.env.AXIOM_IV, {algorithm: 'HS256', expiresIn: 129600});
                res.json({success: true, err: null, token});
            });
        } else {
            res.status(400).json(err);
        }
    });
});

router.route('/signup').post((req, res) => {
    new Admin(req.body).save(function(err, doc) {
        if (err) res.status(400).json(err);
        else res.status(201).json(doc);
    });
});

module.exports = router;