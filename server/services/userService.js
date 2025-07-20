import User from "../models/User.js";

// Service to create new user
export const createUser = async (fullName, email) => {
  return await User.create({
    fullName,
    email,
    hasAccess: false,
    createdAt: new Date(),
  });
};

// Service to grant access after payment
export const grantAccessAfterPayment = async (email) => {
  return await User.findOneAndUpdate(
    { email },
    {
      hasAccess: true,
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
