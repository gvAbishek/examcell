const mongoose = require('mongoose')

const Productschema =new mongoose.Schema({
    productName: String,
    productDescription: String,
    purchaseQuantity: Number,
    minimumQuantity: Number,
    lotNumber: Number,
    serialNumberFrom: Number,
    serialNumberTo: Number
})

const ProductModel = mongoose.model("products",Productschema)
module.exports = ProductModel