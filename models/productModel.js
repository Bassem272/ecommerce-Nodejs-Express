import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
