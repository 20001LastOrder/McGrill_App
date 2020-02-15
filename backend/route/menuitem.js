const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let Restaurant = require('../model/restaurant');
let RestaurantOwner = require('../model/restaurantowner');
let MenuItem = require('../model/menuitem');

//take in restaurant Id as a param and body as a menuItem.
router.route('/create').post(async (req, res) => {
    try{
        //check ownership
        let owner = await RestaurantOwner.findOne({email: req.user.username});
        if(!owner.restaurants.includes(req.query.restaurantId)){
            throw "you do not own this restaurant";
        }
        let updatedRestaurant = await createMenuItemForRestaurant(req.query.restaurantId, req.body, res);
        res.status(201).json(updatedRestaurant);
    }catch(err){
        res.status(400).json(err);
    }
});

const createMenuItemForRestaurant = async function (restaurantId, menuItem, res) {
    let item = await new MenuItem(menuItem).save();
    let restaurant = await Restaurant.findByIdAndUpdate(restaurantId,
        { $push: { menuitems: item._id } },
        { new: true, useFindAndModify: false });
    return restaurant;
    // return new MenuItem(menuItem).save(function (err, doc) {
    //     if (err) res.status(400).json(err);
    //     else {
    //         //link doc created to restaurant
    //         return Restaurant.findByIdAndUpdate(
    //             restaurantId,
    //             { $push: { menuitems: doc._id } },
    //             { new: true, useFindAndModify: false }
    //         ).then(() => res.status(200).json(doc));
    //     }
    // });
}

router.route('/update').put((req, res) => {
    MenuItem.findOneAndUpdate(query, { $set: req.body.newData }, { useFindAndModify: false })
        .then((doc) => {
            MenuItem.findOne({ _id: doc._id }).then((doc) => { res.json(doc) })
                .catch((err) => { res.status(400).json(err) });
        })
        .catch((err) => { res.status(400).json(err) });
});

module.exports = router;