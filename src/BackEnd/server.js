import express from "express";
import cors from "cors";
import users from "./api/users.route.js"
const app = express();
app.use(cors());
app.use(express.json()); //so express can read json, no need for body-parser

app.use("/api/v1/users",users);

app.use("*",(req,res)=>{
    res.status(404).json({
        error: "not found!"
    })
});

export default app;