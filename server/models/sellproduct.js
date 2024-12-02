const mongoose = require('mongoose')

const SellProductschema =new mongoose.Schema({
    productName: String,
    departmentNeed: String,
    Quantity: Number,
    lotNumber: Number,
    serialNumberFrom: Number,
    serialNumberTo: Number
})

const SellProductModel = mongoose.model("sellproducts",SellProductschema)
module.exports = SellProductModel