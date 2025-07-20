import { createUser as createUserService } from "../services/userService.js";

export const createUser = async (req, res) => {
  console.log(req.body);
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Both full name and email are required",
    });
  }

  try {
    const newUser = await createUserService(fullName, email);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};
