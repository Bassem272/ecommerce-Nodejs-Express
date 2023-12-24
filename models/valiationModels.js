import mongoose from "mongoose";
import z from "zod";

const userSchema = z.object({
  name: z.string().min(1).max(255).required(),
  email: z.string().email().max(255).required(),
  password: z.string().min(6).max(255).required(),
  date: z.date().default(() => new Date()),
  address: z.string().max(255).nullable(),
  role: z.enum(["user", "admin"]).default("user"),
  cartItems: z.array(
    z
      .string()
      .refine((val) => /^[a-fA-F0-9]{24}$/.test(val))
      .optional() // optional field
  ),
  code: z.string().max(255).nullable(),
  isVerified: z.boolean().default(false),
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
//   code: z.string().max(255).nullable(),
//   isVerified: z.boolean().default(false),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  quantity: z.string(),
});

const orderSchema = z.object({
  status: z.enum(["pending", "processing", "completed"]).default("pending"),
  data: z.date(() => new date()),
  userId: z
    .string()
    .refine((val) => /^[a-fA-F0-0]{24}$/.test(val))
    .required(),
  products: z.array(
    z.object({
      _id: z
        .string()
        .refine((val) => /^[a-fA-F0-9]{24}$/.test(val))
        .required(),
      price: z.number(),
    })
  ),
  address: z.string().required(),
  total: z.number().required(),
});
const resetSchema = z.object({
  email: z.string().email().required(),
  code: z.string().max(255).nullable(),
});
const addressSchema = z . object({
  
  address: z.string().max(255).nullable(),
})

module.exports = {
  userSchema,
  registerSchema,
  loginSchema,
  productSchema,
  orderSchema,
  resetSchema,
  addressSchema
};
