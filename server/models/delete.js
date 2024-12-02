const mongoose = require('mongoose')

const Deleteschema =new mongoose.Schema({
    productName: String,
    productDescription: String,
})

const DeleteModel = mongoose.model("deletes",Deleteschema)
module.exports = DeleteModel