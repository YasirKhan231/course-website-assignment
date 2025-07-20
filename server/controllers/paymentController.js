import {
  createRazorpayOrder,
  verifyUserAccess,
  addPaymentDetails,
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

    // Check user access through service
    const { userExists, hasAccess } = await verifyUserAccess(email);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        userExists,
        hasAccess,
      });
    }

    // Return access status
    res.status(200).json({
      success: true,
      message: "User exists",
      userExists,
      hasAccess,
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
// POST - Add payment details and grant access
export const addPaymentDetail = async (req, res) => {
  const { email, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (
    !email ||
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return res.status(400).json({
      success: false,
      message: "All payment details and email are required",
    });
  }

  try {
    const paymentData = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };

    const updatedUser = await addPaymentDetails(email, paymentData);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified and access granted",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        hasAccess: updatedUser.hasAccess,
        paymentDetails: updatedUser.paymentDetails,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error processing payment",
      error: err.message,
    });
  }
};
