import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", createUser); // For initial user creation

export default router;
