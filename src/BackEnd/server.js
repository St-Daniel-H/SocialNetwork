import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {;
   console.log(req.body);
   res.json({ status: "ok"});
});


app.use("*",(req,res)=>{
    res.status(404).json({
        error: "not found!"
    })
});

export default app;