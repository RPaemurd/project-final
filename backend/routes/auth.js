import express from "express"
import User from "../models/User.js" //denna behöver vi för att kunna spara och hämta användare i MongoDB
import bcrypt from "bcrypt";

//mini server - hanterar bara sina egna routes, istället för att ha alla routes i server.js - kopplar vi sen ihop den med routern i huvudappen
const router = express.Router();

//async - menas att routen innehåller kod som tar tid( prata med databasen )
// utan async/await kan vi inte vänta på svar från MongoDB
router.post("/register", async (req, res) => {

    //body innehåller datan användaren skickade från formuläret
    // destructuring = vi plockar ut email och password direkt istället för req.body.email
    const { email, password } = req.body;

    //Kollar om användaren faktiskt har fyllt i fälten
    //! betyder "inte" - så om email saknas 
    if (!email || !password) {

        //stoppa routern här så att resten av koden inte körs
        //status 400 
        return res.status(400).json({ message: "Email och lösenord krävs"});
    }

//kollar om emailen redan finns i databasen, findOne letar efter ett dokument som matchar, returnerar null om inget hittas
const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({ message: "Email redan registrerad"});
}
//10 betyder att lösenordet processas 10 gånger
//await vänta tills krypteringen är klar innan det skickas vidare
const hashedPassword = await bcrypt.hash(password, 10);

//newUser skapar ett nytt användarobjekt med vårat schema
//vi skickar in email och det krypterade lösenordet
const newUser = new User({
    email: email, 
    password: hashedPassword,
});
//sparar användaren till mongoDB
//await - vänta tills sparandet är klart
await newUser.save();

res.status(201).json({ message: "Konto skapat!" });
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(400).json({ message: 'Email och lösenord krävs' });
    }

    //letar efter användarens email i databasen 
    const user = await User.findOne({ email });
    //om null skickas tillbaka nekas inloggningen
    if (!user) {
    return res.status(401).json({ message: "Fel email eller lösenord"});
    }

    //compare jämför lösenordet med det krypterade, await vänta tills dom jämförts, returnerar true om dom matchar false anars
    const isMatch = await bcrypt.compare(password, user.password);
    //om lösenordet inte matchar nekas inlogg
    if(!isMatch){
    return res.status(401).json({ message: "Fel email eller lösenord"})
    }
    //sparar användarens id i sessionen
    req.session.userId = user._id;
    res.status(200).json({ 
        message: 'Inloggad!', 
        email: user.email,
        id: user._id
    });
})

export default router;
