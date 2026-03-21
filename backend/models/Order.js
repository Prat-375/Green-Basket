import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerInfo: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      paymentMethod: { type: String, required: true },
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: [(items) => items.length > 0, "At least one item is required"],
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);