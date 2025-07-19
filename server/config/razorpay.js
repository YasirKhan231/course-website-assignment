import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
console.log("RAZORPAY KEY", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY KEY", process.env.RAZORPAY_SECRET); // should not be undefined
// should not be undefined

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default razorpay;
