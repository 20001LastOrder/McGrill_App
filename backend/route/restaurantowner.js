const mongoose = require('mongoose');
const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let RestaurantOwner = require('../model/restaurantowner');
let Restaurant = require('../model/restaurant');

router.route('/').get((req, res) => {
    RestaurantOwner.find()
        .then(restaurantowners => {
            restaurantowners.map((restaurantowner) => {
                restaurantowner.password = null;
            });
            res.json(restaurantowners);
        })
        .catch(err => res.status(400).json(err));
});

router.route('/login').get((req, res) => {
    if (!req.headers.email || !req.headers.password) {
        res.status(400).json("bad request");
        return
    }
    RestaurantOwner.findOne({email: req.headers.email}, (err, owner) => {
        if (owner !== null) {
            owner.comparePassword(req.headers.password, (err, isMatch) => {
                if (err) return res.status(400).json(err);
                if (!isMatch) return res.status(401).json("Password Not Correct");
                //console.log(isMatch)
                let token = jsonwebtoken.sign({username: req.headers.email}, process.env.AXIOM_IV, {algorithm: 'HS256', expiresIn: 129600});
                res.json({success: true, err: null, token});
            });
        } else {
            res.status(400).json(err);
        }
    });
});

router.route('/signup').post(async (req, res) => {
    try{
        owner = await new RestaurantOwner(req.body.owner).save();
        restaurant = await new Restaurant(req.body.restaurant).save();
        owner.restaurants.push(restaurant._id);

        // update datebase
        await owner.updateOne({restaurants:owner.restaurants});
        owner = await RestaurantOwner.findOne({_id: owner._id});
        res.status(201).json(owner);
    }catch(err){
        //console.error(err)
        res.status(400).json(err);
    }
});

module.exports = router;