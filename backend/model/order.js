const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order_items: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "MenuItem"
        }
    ],
    restaurantId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }, 
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price : {
        type : Number, 
        required: false
    }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;