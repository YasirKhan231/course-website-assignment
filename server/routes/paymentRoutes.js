import express from "express";
import {
  createOrder,
  verifyPayment,
  addPaymentDetail,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/add-payment-detail", addPaymentDetail);

export default router;
