import express from "express";

const router = express.Router();

router.route("/hey").get((req,res)=>{
res.send("hello bitch");
});
export default router;