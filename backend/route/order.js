const router = require('express').Router();

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
        await populateOrderPrice(); 
        let createdOrder = await Order.save(orderObj);

        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

async function populateOrderPrice(orderObj) {
    orderObj.price = 0; 

    orderObj.order_items.forEach(itemId => {
        MenuItem.findById(itemId).then(item => {
            orderObj.price += item.price; 
        }); 
    });
}

module.exports = router;