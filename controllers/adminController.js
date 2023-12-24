import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";

module.exports = {
  addProduct: async (req, res) => {
    try {
      let product = new Product(req.body);
      let result = await product.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      let { productId } = req.params;
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      let result = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let { productId } = req.params;
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      let result = await Product.findByIdAndDelete(productId);
      return res.status(200).json({ message: "product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      let result = await Product.find();
      if (result.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      let users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      let orders = await Order.find();
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  totalUsers: async (req, res) => {
    try {
      let totalUsers = await User.countDocuments();
      return res.status(200).json(totalUsers);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  totalProducts: async (req, res) => {
    try {
      let totalProducts = await Product.countDocuments();
      return res.status(200).json(totalProducts);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  totalOrders: async (req, res) => {
    try {
      let totalOrders = await Order.countDocuments();
      return res.status(200).json(totalOrders);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getOrder: async (req,res) =>{
    try{
        let {orderId} = req.params;
        let order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json(order);
    }catch(err) {
        return res .status(500).json({message: err.message});
    }
  }
  ,
  getOrdersInRange: async (req, res) => {
    try {
      let { startDate, endDate } = req.query;
      let filters = {};
      if (startDate && endDate) {
        filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      let orders = await Order.find(filters).sort({ date: -1 });
      // .limit(10);
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getUser: async (req,res) => {
    try{
        let {userId} = req.params;
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    }catch(err) {
        return res .status(500).json({message: err.message});
    }
  }
  ,
  changeUser: async (req, res) => {
    try {
      let { userId } = req.params;
      let user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.role !== "admin")
        return res
          .status(403)
          .json({ message: "cannot change user as it is admin" });
      user.role = "admin";
      await user.save();
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
