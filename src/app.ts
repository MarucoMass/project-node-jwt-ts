import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { authenticateToken } from "./middleware/authTokenMiddleware";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authenticateToken, userRoutes)

export default app;