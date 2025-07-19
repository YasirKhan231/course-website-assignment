import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hasAccess: { type: Boolean, default: false },
  accessLog: [Date],
});

export default mongoose.model("User", userSchema);
