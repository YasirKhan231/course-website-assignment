// services/paymentService.js
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js";

export const createRazorpayOrder = async (amount, currency, receipt) => {
  const options = {
    amount, // amount in paise
    currency,
    receipt,
  };
  const order = await razorpay.orders.create(options);
  return order;
};
// services/paymentService.js
export const verifyRazorpayPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  email,
}) => {
  // 1. Signature Verification
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed: Invalid signature");
  }

  // 2. Update/Create User Record
  await User.findOneAndUpdate(
    { email },
    {
      hasAccess: true,
      paymentId: razorpay_payment_id,
      lastAccessed: new Date(),
    },
    { upsert: true, new: true }
  );

  return true;
};
