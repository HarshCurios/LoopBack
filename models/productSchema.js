const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
productSchema.set("timestamps", true);

module.exports = mongoose.model("product", productSchema);
