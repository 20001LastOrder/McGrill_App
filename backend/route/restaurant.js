const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
let MenuItem = require('../model/menuitem');

let Restaurant = require('../model/restaurant');

router.route('/').get((req, res) => {
    Restaurant.find()
        .then(restaurants => {
            restaurants.map((restaurant) => {
                restaurant.password = null;
            });
            res.json(restaurants);
        })
        .catch(err => res.status(400).json(err));
});

router.route('/login').get((req, res) => {
    if (!req.headers.username || !req.headers.password) {
        res.status(400).json("bad request");
        return
    }
    Restaurant.findOne({username: req.headers.username}, (err, restaurant) => {
        if (!err) {
            restaurant.comparePassword(req.headers.password, (err, isMatch) => {
                if (err) return res.status(400).json(err);
                if (!isMatch) return res.status(401).json("Password Not Correct");
                console.log(isMatch)
                let token = jsonwebtoken.sign({username: req.headers.username}, process.env.AXIOM_IV, {algorithm: 'HS256', expiresIn: 129600});
                res.json({id: restaurant._id, success: true, err: null, role: restaurant.isServer, token});
            });
        } else {
            res.status(400).json(err);
        }
    });
});

router.route('/signup').post((req, res) => {
    console.log(req.body)
    new Restaurant(req.body).save(function(err, doc) {
        if (err) res.status(400).json(err);
        else res.status(201).json(doc);
    });
});

router.route('/menu').get((req, res) => {
    if (!req.header.name){
        res.status(400).json("bad request");
        return
    }
    Restaurant.findOne({name: req.headers.name}, (err, restaurant) => {
        if (!err) {
            // retrive the restaurant successfully
            res.status(200).json(restaurant.menuitems);
        } else {
            res.status(400).json(err);
        }
    })
});


router.route('/getItemByName').get(async (req, res) => {
    try{
        let restaurant = await Restaurant.findOne({restaurantId: req.params.restaurantId});
        if(restaurant == undefined)
            throw "No restaurant with id found";
        for(let i=0; i<restaurant.menuitems.length; i++) {
            let menuId = restaurant.menuitems[i];
            let menu = await MenuItem.findById(menuId);
            if(menu.name == req.headers.name){
                res.status(200).json(menu);
                return;
            }
        }
        res.status(200).json(null);
    } catch(err) {
        res.status(400).json(err);
    }
})

router.route('/getItemByType').get(async (req, res) => {
    try{
        let answer = [];
        let restaurant = await Restaurant.findOne({restaurantId: req.params.restaurantId});
        if(restaurant == undefined)
            throw "No restaurant with id found";
        for(let i=0; i<restaurant.menuitems.length; i++) {
            let menuId = restaurant.menuitems[i];
            let menu = await MenuItem.findById(menuId);
            if(menu.food_type == req.query.food_type){
                answer.push[menu];
            }
        }
        res.status(200).json(answer);
    } catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;