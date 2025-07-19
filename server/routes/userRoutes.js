import express from "express";
import {
  getUserByEmail,
  createOrUpdateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:email", getUserByEmail);
router.post("/", createOrUpdateUser);

export default router;
