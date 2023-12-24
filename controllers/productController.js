import mongoose from "mongoose";
import { Product } from "../models/product";

module.exports = {
  getProduct: async (req, res) => {
    try {
      let productId = req.params.productId;
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ error: "Not valid product Id" });
      }
      let product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      let products = await Product.find();
      if (products.length == 0) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  searchProducts: async (req, res) => {
    try {
      let { name, category, maxPrice, minPrice } = req.query;
      let filters = {};
      if (name) filters.name = { $regex: name, $options: "i" };
      if (category) filters.category = { $regex: category, $options: "i" };
      if (maxPrice && minPrice) {
        filters.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
      } else if (maxPrice) filters.price = { $lte: parseFloat(maxPrice) };
      else if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
      let products = await Product.find(filters);
      if (products.length == 0) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
