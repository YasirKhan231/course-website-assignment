import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    maxlength: [100, "Full name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: false,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  hasAccess: {
    type: Boolean,
    default: false,
  },
  paymentDetails: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    payment_date: {
      type: Date,
      default: Date.now,
    },
  },
  accessLog: [
    {
      accessTime: {
        type: Date,
        default: Date.now,
      },
      action: {
        type: String,
        enum: ["login", "course_access", "payment_verified", "payment_failed"],
        default: "course_access",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

userSchema.index({ email: 1 });
userSchema.index({ hasAccess: 1 });

export default mongoose.model("User", userSchema);
