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
    //Status is either PENDING, COMFIRMED, IN_PROGRESS, DELIVERED or COMPLETED.
    status : {
        type : String,
        default: "PENDING"
    },
    price : {
        type : Number, 
        required: false
    },
    created_at: {
        type:Date,
        default: new Date()
    }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;