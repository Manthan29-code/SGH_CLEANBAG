import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "set-cookie"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to SGH CleanBag API");
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie"
//   );
//   next();
// });

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/reports", reportRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
