import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

     email: {
        type: String,
        required: true,
        unique: true, //noone gets the same email
        lowercase: true, // saves with small letters
    },
        password:{ 
        type: String,
        required: true
    }
}, { timestamps: true} //automatic adds createdAT and updatedAt
); 
//creates a user modell based on schema
const User = mongoose.model("User", userSchema)


export default User
