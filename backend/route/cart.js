const router = require("express").Router();

const Cart = require("../model/cart");

addCartItem = async (req, res) => {
  try {
    const newCartItem = await Cart.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        item: newCartItem
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

deleteCartItem = async (req, res) => {
  const { restaurant, item_name, user_email } = req.body;
  try {
    await Cart.findOneAndDelete({
      $and: [
        { user_email: user_email },
        { restaurant: restaurant },
        { item_name: item_name }
      ]
    });

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

router
  .route("/")
  .delete(deleteCartItem)
  .post(addCartItem);

module.exports = router;
