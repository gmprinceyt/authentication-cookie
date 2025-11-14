import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, {} from "jsonwebtoken";
import path from "node:path";
const app = express();
const jwtscreat = "test123";
const __dirname = path.resolve();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign({ email }, jwtscreat);
    // Set Cookie Data
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });
    res.send("logged in!");
});
app.post("/logout", (req, res) => {
    // Clear Cookie Data
    res.clearCookie("token");
    res.send("logout!");
});
app.post("/home", (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.send("token not provided!");
    const decode = jwt.verify(token, jwtscreat);
    res.send(decode.email);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./src/index.html"));
});
app.listen(3000, () => {
    console.log("Server listing on Port 3000");
});
