import jsonToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import nanoid from "nanoid";
import dotenv from "dotenv";

import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";

import emailService from "../services/emailService";

dotenv.config();

module.exports = {
  //register
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          message: "User already exist",
        });
      }
      const code = nanoid(6);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        name,
        code,
        isVerified: false,
      });

      await user.save();
      await emailService.sendVerificationEmail(email, code);

      res.status(201).json({
        message: "User registered. Please check your email for verification.",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { code } = req.body;
      const user = await User.findOne({ code });
      if (!user) {
        return res.status(400).json({ message: "Invalid code" });
      }
      user.isVerified = true;
      user.code = null;
      await user.save();
      res.status(200).json({ message: "Email verified" });
    } catch (error) {
      console.error("Error verifying email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(400).json({ message: "Invalid password" });
      }
      if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
        console.error("Missing JWT configuration in environment variables");
        process.exit(1);
      }

      const token = jsonToken.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return res
        .status(200)
        .json({ token, userId: user._id, message: "login Successful" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  logOut: async (req, res) => {
    try {
      // we are using jsonwebtoken
      const { userId, token } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid userId" });
      }
      user.token = jwt.sign(
        { userId: process.env.JWT_SECRET },
        process.env.JWT_SECRET,
        { expiresIn: "2s" }
      );
      res.status(200).json({ message: "Logout successful", token });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }
      // send an email for the user with link to  reset the password
      return res.status(200).json({ message: "Email sent" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  profile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid userId" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  orders: async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Order.find(
        { userId },
        { userId: 0, _Id: 0 }
      ).populate("products");
      if (!orders) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  setAndUpdateAddress: async (req, res) => {
    try {
      const address = req.body.address;
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid userId" });
      }
      user.address = address;
      await user.save();
      return res.status(200).json({ message: "Address updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid userId" });
      }
      return res.status(200).json(user.cart);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: "Invalid product" });
      }
      if (req.use.cartItems.includes(productId)) {
        return res.status(200).json({ message: "Product already in cart" });
      }
      req.user.cartItems.push(productId);
      await req.user.save();
      return res.status(200).json({ message: "Cart updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ message: "product not found" });
      }
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }

      if (!user.cartItems.includes(productId)) {
        return res.status(400).json({ message: "product not in cart" });
      }
      user.cartItems = user.cartItems.filter((item) => item !== productId);
      await user.save();
      return res
        .status(200)
        .json({ message: "product removed and Cart updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  newOrder: async (req, res) => {
    try {
      const { cartItems, total } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "Invalid user" });
      }
      const products = await Product.find({ _id: { $in: cartItems } });
      if (products.length == 0) {
        return res.status(400).json({ message: "Invalid products" });
      }
      const order = new Order({
        userId: user._id,
        products: products.map((it) => it._id),
        total: total,
        address: user.address,
        status: "pending",
      });

      await order.save();
      for (const product of products) {
        await Product.findByIdAndUpdate(product._id, { $inc: { stock: -1 } });
      }
      // or use this PromiseAll like this
      /*
    await Promise.all(products.map(async (product) => {
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -1 } });
    }));
    */
      user.cartItems = [];
      await user.save();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
