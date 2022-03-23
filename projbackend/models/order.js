const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

//We can define multiple Schema in a same file
//It is not a good idea but here we are going to deal like this only

const ProductCartSchema = new mongoose.Schema({
    //this ProductCartSchema doesn't contain any new product but it consist of product 
    //that are already there in product schema
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number

});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String,
        maxlength: 100,
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "delivered", "Shipped", "Processing", "Received"]
    },
    updated: {
        type: Date
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

//Now we have to throw 2 schema at the same time
module.exports = { Order, ProductCart };