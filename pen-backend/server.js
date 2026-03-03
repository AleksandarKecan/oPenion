const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [];

app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User allready exist" });
    }
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    res.status(201).json({ message: "Registration sucssess", user: { id: newUser.id, username, email } });
});

app.post("/api/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Wrong email or password" });
    }

    res.json({ message: "Login Sucsessuful", user: { id: user.id, username: user.username, email: user.email } });
});

app.listen(PORT, () => {
    console.log(`Server works on http://localhost:${PORT}`);
});