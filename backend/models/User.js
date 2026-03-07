import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

     email: {
        type: String,
        required: true,
        unique: true, //ingen får ha samma email
        lowercase: true, // sparas med små bokstäver
    },
        password:{ 
        type: String,
        required: true
    }
}, { timestamps: true} //lägger automatiskt till createdAT och updatedAt
); 
//Skapar en user modell baserat på schemat
const User = mongoose.model("User", userSchema)


export default User
