import User from "../models/User.js";

export const createUser = async (fullName, email) => {
  return await User.create({
    fullName,
    email,
    hasAccess: false,
    createdAt: new Date(),
  });
};
