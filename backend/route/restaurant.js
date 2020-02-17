const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
let MenuItem = require('../model/menuitem');

let Restaurant = require('../model/restaurant');

router.route('/all').get(async (req, res) => {
    try{
        let restaurants = await Restaurant.find();
        console.log(restaurants);
        res.status(200).json(restaurants);
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
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