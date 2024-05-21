const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    name:String,
    brand:String,
    price:String,
    category:String,
    userID:String
});

module.exports = mongoose.model("prods",productSchema)