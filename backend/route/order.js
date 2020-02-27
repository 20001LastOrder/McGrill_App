const router = require('express').Router();
const mongoose = require('mongoose');

let Restaurant = require('../model/restaurant');
let MenuItem = require('../model/menuitem');
let User = require('../model/user');
let Order = require('../model/order');

router.route('/create').post(async (req, res) => {
    if(!req.body.customerId || !req.body.restaurantId){
        res.status(400).json("bad req");
        return
    }

    try {
        if(!Restaurant.findById(req.body.restaurantId) || !User.findById(req.body.customerId)) 
            throw "Restaurant or customer does not exist";
        
        let orderObj = req.body; 
        
        let price = 0; 

        for(const itemId of orderObj.order_items){
            let item = await MenuItem.findById(itemId);
            if(item) price+=item.price;
        }

        orderObj.price = price;

        let createdOrder = new Order({
            restaurantId: mongoose.Types.ObjectId(req.body.restaurantId),
            customerId: mongoose.Types.ObjectId(req.body.customerId),
            price : orderObj.price, 
        });

        createdOrder.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;