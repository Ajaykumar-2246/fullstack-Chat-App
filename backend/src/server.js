import path from "path";
import express from "express";
import cors from "cors"; // Cross-Origin Resource Sharing
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./Database/database.js";
import userRouter from "./routes/users.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./utils/soketio.js";

// Load environment variables
dotenv.config({
  path: "./.env",
});

// Middleware configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
// Database connection and server startup
connectDB()
  .then(() => {
    const PORT = process.env.PORT;
    server.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });

export { app };
