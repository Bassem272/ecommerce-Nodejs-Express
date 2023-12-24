import mongoose from "mongoose";
import Product from "./productModel.js";
const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["processing", "pending", "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 products:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true}]
 ,
  address: { type: String, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
