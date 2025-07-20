// controllers/paymentController.js
import User from "../models/User.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/paymentService.js";

export const createOrder = async (req, res) => {
  console.log("Incoming Request Body:", req.body);
  const { amount, currency, receipt } = req.body;

  try {
    const order = await createRazorpayOrder(amount, currency, receipt);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.log("Error creating order:", err),
      res.status(500).json({
        success: false,
        message: "Order creation failed",
        error: err.message,
      });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check user access in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        userExists: false,
        hasAccess: false,
      });
    }

    // Return access status
    res.status(200).json({
      success: true,
      message: "User exists",
      userExists: true,
      hasAccess: user.hasAccess,
    });
  } catch (err) {
    console.error("Access verification error:", err);
    res.status(500).json({
      success: false,
      message: "Error verifying user access",
      error: err.message,
    });
  }
};
