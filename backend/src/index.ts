import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser";
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)


const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));


// app.post("/api/users/register",(req,res)=>{
    // res.json("HELLO");
// })
console.log("userRoutes")
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

app.listen(4000,()=>{
    console.log("App is running on port 4000")
})