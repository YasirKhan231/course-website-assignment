import User from "../models/User.js";

// Service to find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Service to create or update user access
export const createOrUpdateUserAccess = async (email) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, hasAccess: true, accessLog: [new Date()] });
  } else {
    user.hasAccess = true;
    user.accessLog.push(new Date());
  }

  await user.save();
  return user;
};
