import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: () => crypto.randomUUID()
    }
}, { timestamps: true });
//creates a user modell based on schema
const User = mongoose.model("User", userSchema)


export default User
