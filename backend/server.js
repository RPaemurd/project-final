import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth";
import session from 'express-session';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
/* mongoose.Promise = Promise; */
const port = process.env.PORT || 8081;
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

// Session management
// secret: a secret key that encrypts the session
// resave: do not save the session if nothing has changed
// saveUninitialized: do not save empty sessions
 app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
})); 

// tells express that all routes in auth.js should start with /api
// register becomes /api/register
app.use("/api", authRoutes);

app.use

// Start the server
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ Succé! Vi har kontakt med MongoDB Atlas.");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
});
  })
  .catch((err) => {
    console.error("❌ Aj då, kunde inte ansluta till databasen:", err);
  });
