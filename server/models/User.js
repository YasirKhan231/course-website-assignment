import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"], // Makes field mandatory
    trim: true, // Removes whitespace from both ends
    maxlength: [100, "Full name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: false,
    trim: true,
    lowercase: true, // Stores email in lowercase
    match: [
      // Basic email format validation
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  hasAccess: {
    type: Boolean,
    default: false,
  },
  accessLog: [
    {
      accessTime: {
        type: Date,
        default: Date.now,
      },
      action: {
        type: String,
        enum: ["login", "course_access", "payment"], // Allowed values
        default: "course_access",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set on creation
    immutable: true, // Cannot be changed after creation
  },
});

// Index for faster queries on frequently accessed fields
userSchema.index({ email: 1 });
userSchema.index({ hasAccess: 1 });

export default mongoose.model("User", userSchema);
