const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    product_id: {
      type: String,
      required: true,
    },
  
    product_name: String,
    price: Number,
    thumb_image: String,
  
    quantity: {
      type: Number,
      default: 1,
    },
    product_sku: String
  });

  module.exports = mongoose.model("Cart",cartSchema);