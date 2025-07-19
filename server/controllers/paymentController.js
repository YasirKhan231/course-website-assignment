// controllers/paymentController.js
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
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    await verifyRazorpayPayment(req.body);
    res.status(200).json({ success: true, message: "Payment verified" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
