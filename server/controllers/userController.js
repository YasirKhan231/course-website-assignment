import {
  findUserByEmail,
  createOrUpdateUserAccess,
} from "../services/userService.js";

// GET user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      email: user.email,
      hasAccess: user.hasAccess,
      accessLog: user.accessLog,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

// POST or update user
export const createOrUpdateUser = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  try {
    const user = await createOrUpdateUserAccess(email);
    res.status(200).json({ success: true, message: "User access updated" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error saving user", error: err });
  }
};
