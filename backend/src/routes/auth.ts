import express,{Request,Response} from "express"
import User from "../models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"
import verifyToken from "../middleware/auth";
const router=express.Router()

router.post("/login",[
    check("email","Email is Required").isEmail(),
    check("password","Password with 6 or more characters required").isString()
],
async(req:Request,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(500).json({
                message:"Invalid Username"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const jwtToken=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn:"1d"
                });
                res.cookie("auth_token",jwtToken,{
                    httpOnly:true,
                    secure:process.env.NODE_ENV==="production",
                    maxAge:86400000,
                })
            return res.status(200).json({message:"You are Successfully Logined"})
        }
        else{
            return res.status(400).json({message:"Invalid Password"})
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went Wrong"})
    }
})
router.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
res.status(200).send({userId:req.userId})
})

export default router;