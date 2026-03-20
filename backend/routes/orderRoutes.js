import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { customerInfo, orderItems, total } = req.body;

    if (!customerInfo || !orderItems || !orderItems.length || !total) {
      return res.status(400).json({
        message: "Missing required order data",
      });
    }

    const formattedItems = orderItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
    }));

    const order = await Order.create({
      customerInfo,
      orderItems: formattedItems,
      total,
    });

    res.status(201).json({
      message: "Order saved successfully",
      order,
    });
  } catch (error) {
    console.error("Order save error:", error);
    res.status(500).json({
      message: "Failed to save order",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "delivered", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({
      message: "Failed to update status",
    });
  }
});

export default router;