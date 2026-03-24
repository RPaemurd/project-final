import express from "express"
7import User from "../models/User.js" // we need this to save and retrieve users in MongoDB
import bcrypt from "bcrypt";

const router = express.Router();

// Middleware to protect routes — checks the Authorization header for a valid token
export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Ingen token angiven" });
    }
    const user = await User.findOne({ accessToken: token });
    if (!user) {
        return res.status(401).json({ message: "Ogiltig token" });
    }
    req.user = user;
    next();
};

// async - means the route contains code that takes time (talking to the database)
// without async/await we cannot wait for a response from MongoDB
router.post("/register", async (req, res) => {

    // body contains the data the user submitted from the form
    // destructuring = we extract email and password directly instead of req.body.email
    const { email, password } = req.body;

    // Checks if the user has actually filled in the fields
    // ! means "not" - so if email is missing
    if (!email || !password) {

        // stop the router here so the rest of the code does not run
        // status 400
        return res.status(400).json({ message: "Email och lösenord krävs"});
    }

// checks if the email already exists in the database, findOne looks for a matching document, returns null if nothing found
const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({ message: "Email redan registrerad"});
}
// 10 means the password is hashed 10 times
// await wait until encryption is complete before proceeding
const hashedPassword = await bcrypt.hash(password, 10);

// newUser creates a new user object with our schema
// we pass in email and the hashed password
const newUser = new User({
    email: email, 
    password: hashedPassword,
});
// saves the user to MongoDB
// await - wait until saving is complete
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

    // compare compares the password with the hashed one, await wait until compared, returns true if they match false otherwise
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password does not match login is denied
    if(!isMatch){
    return res.status(401).json({ message: "Fel email eller lösenord"})
    }
    res.status(200).json({
        message: 'Inloggad!',
        email: user.email,
        id: user._id,
        accessToken: user.accessToken
    });
})

export default router;
