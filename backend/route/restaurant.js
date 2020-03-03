const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
let MenuItem = require('../model/menuitem');
let jwt = require('jsonwebtoken');
let Restaurant = require('../model/restaurant');
let RestaurantOwner = require('../model/restaurantowner');
let User = require('../model/user');

router.route('/all').get(async (req, res) => {
    try{
        let restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    }catch(err){
        res.status(400).json(err)
    }
});

router.route('/signup').post((req, res) => {
    new Restaurant(req.body).save(function(err, doc) {
        if (err) res.status(400).json(err);
        else res.status(201).json(doc);
    });
});

router.route('/update').put((req, res) => {
    RestaurantOwner.findOne({email: jwt.verify(req.headers.authorization.split(' ')[1], process.env.AXIOM_IV).username}, async (err, doc) => {
        let idx = doc.restaurants.indexOf(req.body._id);
        if (idx > -1) {
            let id = req.body._id;
            delete req.body._id;
            try {
                await Restaurant.findOneAndUpdate({ _id: id }, { $set: req.body });
                let updated = await Restaurant.findOne({ _id: id });
                res.status(200).json(updated);
                return;
            } catch (err) {
                return res.status(403).json({message: "bad update"});
            }
            
        } else {
            res.status(400).json({ "err": "no such restaurant under this person" });
            return;
        }
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

router.route('/getCurrentOrders').get(async (req, res) => {
    if(!req.query.restaurantId){
        res.status(400).send("bad request");
        return
    }
    try{
        let result = []; 
        await Restaurant
                .findById(req.query.restaurantId)
                .populate("orders")
                .exec(function (err, resto) {
                    if(err || !resto){
                        result = ["no_restaurant_found"]; 
                        return;
                    }
                    result = resto.orders.filter(order => order.status === "IN_PROGRESS");
                    res.status(200).json(result);
            });
            
    } catch(err) {
        res.status(500).json(err);
    }
})

router.route('/getPastOrders').get(async (req, res) => {
    if(!req.query.restaurantId){
        res.status(400).send("bad request");
        return
    }
    try{
        let result = []; 
        
        await Restaurant
                .findById(req.query.restaurantId)
                .populate("orders")
                .exec(function (err, resto) {
                    if(err || !resto){
                        result = ["no_restaurant_found"];
                        return;
                    }
                    result = resto.orders.filter(order => order.status === "COMPLETED");
                    res.status(200).json(result);
                });

    } catch(err) {
        res.status(500).json(err);
    }
})

router.route('/addRestaurantCategory').put(async (req, res) => {
    
    if(!req.query.restaurantId || !req.body.category){
        res.status(400).send("bad request");
        return
    }
    let owner = await RestaurantOwner.findOne({email: jwt.verify(req.headers.authorization.split(' ')[1], process.env.AXIOM_IV).username});
    if (!owner) {
        res.status(501).json(owner);
        return;
    }
    var found = false;
    for(var i = 0; i < owner.restaurants.length; i++) {
        if (owner.restaurants[i] == req.query.restaurantId) {
            found = true;
            break;
        }
    }
    if (!found) {
        res.status(500).json(owner);
        return;
    }
    
    try{
        let rest = await Restaurant.findById(req.query.restaurantId);
        rest.category = rest.category.concat(req.body.category);
        rest.save();
        res.status(200).json(rest);
    } catch(err) {
        res.status(500).json(err);
    }
})

router.route('/getByCategory').get(async (req, res) => {
    if(!req.query.category){
        res.status(400).send("bad request");
        return
    }
    try{
        let result = await Restaurant.find({ category: { $all: req.query.category } });
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;