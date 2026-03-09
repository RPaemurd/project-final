import express from "express"
import User from "../models/User.js" 
import bcrypt from "bcrypt";

// mini server - only handles its own routes, instead of having all routes in server.js - we then connect it with the router in the main app
const router = express.Router();

router.post("/register", async (req, res) => {

    // body contains the data the user submitted from the form
    const { email, password } = req.body;

    
    if (!email || !password) {

        // status 400
        return res.status(400).json({ message: "Email och lösenord krävs"});
    }

// checks if the email already exists in the database, findOne looks for a matching document, returns null if nothing found
const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({ message: "Email redan registrerad"});
}
// 10 means the password is hashed 10 times
const hashedPassword = await bcrypt.hash(password, 10);

// newUser creates a new user object with our schema
const newUser = new User({
    email: email, 
    password: hashedPassword,
});
// saves the user to MongoDB
await newUser.save();

res.status(201).json({ message: "Konto skapat!" });
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: 'Email och lösenord krävs' });
    }

    // looks for the user's email in the database
    const user = await User.findOne({ email });
    // if null is returned the login is denied
    if (!user) {
    return res.status(401).json({ message: "Fel email eller lösenord"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // if the password does not match login is denied
    if(!isMatch){
    return res.status(401).json({ message: "Fel email eller lösenord"})
    }
    req.session.userId = user._id;
    res.status(200).json({ 
        message: 'Inloggad!', 
        email: user.email,
        id: user._id
    });
})

export default router;
