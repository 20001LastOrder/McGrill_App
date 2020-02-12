const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');

let Restaurant = require('../model/restaurant');
let MenuItem = require('../model/menuitem');

//take in restaurant Id as a param and body as a menuItem.
router.route('/create').post((req, res) => {
    console.log(req.query.restaurantId);
    return createMenuItemForRestaurant(req.query.restaurantId, req.body, res);
});

const createMenuItemForRestaurant = function (restaurantId, menuItem, res) {
    return new MenuItem(menuItem).save(function (err, doc) {
        if (err) res.status(400).json(err);
        else {
            //link doc created to restaurant
            return Restaurant.findByIdAndUpdate(
                restaurantId,
                { $push: { menuitems: doc._id } },
                { new: true, useFindAndModify: false }
            ).then(() => res.status(200).json(doc));
        }
    });
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