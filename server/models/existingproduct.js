const mongoose = require('mongoose')

const ExistingProductschema =new mongoose.Schema({
    productName: String,
    productDescription: String,
    addQuantity: Number,
    lotNumber: Number,
    serialNumberFrom: Number,
    serialNumberTo: Number
})

const ExistingProductModel = mongoose.model("existingproducts",ExistingProductschema)
module.exports = ExistingProductModel