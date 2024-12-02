const mongoose = require('mongoose')

const Loginschema =new mongoose.Schema({
    email: String,
    password: String,
})

const LoginModel = mongoose.model("users",Loginschema)
module.exports = LoginModel