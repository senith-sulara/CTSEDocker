const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Products = new Schema({
    product: {type: String},
    items: { type: String},
    price: { type: String},
    image: {type: String},
  },
   { 
    timestamps: true 
   }
  );
  
  module.exports = mongoose.model("products", Products);