import {
  createUser as createUserService,
  grantAccessAfterPayment as grantAccessService,
} from "../services/userService.js";

// POST - Create new user (name + email)
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
    // Create new user through service
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
    // Handle duplicate email error from service
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

// POST - Grant access after payment
export const grantAccessAfterPayment = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Grant access through service
    const updatedUser = await grantAccessService(email);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Access granted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error granting access",
      error: err.message,
    });
  }
};
