// services/paymentService.js
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js";

export const createRazorpayOrder = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt,
  };
  const order = await razorpay.orders.create(options);
  return order;
};

export const verifyRazorpayPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  email,
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Invalid signature");
  }

  // Update user access
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, hasAccess: true });
  } else {
    user.hasAccess = true;
  }
  await user.save();

  return true;
};
