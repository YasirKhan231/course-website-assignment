import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://course-website-assignment.vercel.app", // Production frontend
  // Add other domains as needed
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-razorpay-signature"],
  credentials: true, // If using cookies/sessions
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Body parser middleware (Express 4.16+ has built-in JSON parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
