import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
/* mongoose.Promise = Promise; */
const port = process.env.PORT || 8081;
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

// tells express that all routes in auth.js should start with /api
// register becomes /api/register
app.use("/api", authRoutes);

// Start the server
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ Succéss! We are conected to MongoDB Atlas.");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
});
  })
  .catch((err) => {
    console.error("❌ Could not connect to the database:", err);
  });
