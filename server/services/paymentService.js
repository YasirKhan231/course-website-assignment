import razorpay from "../config/razorpay.js";
import User from "../models/User.js";

export const createRazorpayOrder = async (amount, currency, receipt) => {
  const options = {
    amount,
    currency,
    receipt,
  };
  const order = await razorpay.orders.create(options);
  return order;
};
export const verifyUserAccess = async (email) => {
  const user = await User.findOne({ email }).select("hasAccess");

  if (!user) {
    return {
      userExists: false,
      hasAccess: false,
    };
  }

  return {
    userExists: true,
    hasAccess: user.hasAccess,
  };
};
export const addPaymentDetails = async (email, paymentData) => {
  return await User.findOneAndUpdate(
    { email },
    {
      hasAccess: true,
      paymentDetails: {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        payment_date: new Date(),
      },
      $push: {
        accessLog: {
          accessTime: new Date(),
          action: "payment_verified",
        },
      },
    },
    { new: true }
  );
};
