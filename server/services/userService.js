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

// Service to add payment details
