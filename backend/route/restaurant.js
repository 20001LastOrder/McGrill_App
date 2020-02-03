const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let User = require('../model/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => {
            users.map((user) => {
                user.password = null;
            });
            res.json(users);
        })
        .catch(err => res.status(400).json(err));
});

router.route('/login').get((req, res) => {
    if (!req.headers.username || !req.headers.password) {
        res.status(400).json("bad request");
        return
    }
    User.findOne({username: req.headers.username}, (err, user) => {
        if (!err) {
            user.comparePassword(req.headers.password, (err, isMatch) => {
                if (err) return res.status(400).json(err);
                if (!isMatch) return res.status(401).json("Password Not Correct");
                console.log(isMatch)
                let token = jsonwebtoken.sign({username: req.headers.username}, process.env.AXIOM_IV, {algorithm: 'HS256', expiresIn: 129600});
                res.json({success: true, err: null, role: user.isServer, token});
            });
        } else {
            res.status(400).json(err);
        }
    });
});

router.route('/signup').post((req, res) => {
    console.log(req.body)
    new User(req.body).save(function(err, doc) {
        if (err) res.status(400).json(err);
        else res.status(201).json(doc);
    });
    
});

module.exports = router;