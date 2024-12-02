const mongoose = require('mongoose')

const UpdateQuantityschema =new mongoose.Schema({
    productName: String,
    productDescription: String,
    updateQuantity: Number,
    upminimumQuantity: Number,
    lotNumber: Number,
    serialNumberFrom: Number,
    serialNumberTo: Number
})

const UpdateQuantityModel = mongoose.model("updatequants",UpdateQuantityschema)
module.exports = UpdateQuantityModel