import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    address: { type: String },
    role: { type: String,enum:["user","admin"], default: "user" },
    cartItems:[{ type: Schema.Types.ObjectId, ref: "product" }],
    code:{ type: String},
    isVerified:{ type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);