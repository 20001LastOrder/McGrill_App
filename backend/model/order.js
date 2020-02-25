const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order_items: [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "MenuItem"
        }
    ],
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }, 
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;