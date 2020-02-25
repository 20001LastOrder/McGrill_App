const router = require('express').Router();

let Restaurant = require('../model/restaurant');
let MenuItem = require('../model/menuitem');
let User = require('../model/user');
let Order = require('../model/order');

router.route('/create').post(async (req, res) => {
    try {
        if(!Restaurant.exists(req.body.restaurantId) || !User.exists(req.body.customerId)) 
            throw "Restaurant or customer does not exist";
        
        let orderObj = req.body; 
        orderObj.price = orderObj.order_items.reduce( (total, item) => { return total + item.price });
        let createdOrder = await Order.save(orderObj);

        res.status(201).json(createdOrder);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;