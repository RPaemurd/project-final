import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
/* mongoose.Promise = Promise; */
const port = process.env.PORT || 8081;
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

// Session-hantering
// secret: en hemlig nyckel som krypterar sessionen
// resave: spara inte sessionen om inget ändrats
// saveUninitialized: spara inte tomma sessioner
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

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
