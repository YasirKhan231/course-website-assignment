import express from "express";
import {
  createUser,
  grantAccessAfterPayment,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser); // For initial user creation
router.post("/grant-access", grantAccessAfterPayment); // For post-payment access

export default router;
