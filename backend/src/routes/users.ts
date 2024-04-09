import express,{Request,Response} from "express";
import User from "../models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator"
const router=express.Router();
router.post("/register",[
    check("firstname","First Name is Required").isString(),
    check("lastname","Last Name is Required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more characters required").isLength({min:6}),
    check("confirmPassword","Password with 6 or more characters required").isLength({min:6})


],
async(req:Request,res:Response)=>{
    console.log("Users register-1")
    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    console.log("Users register-2")
    try{
        let user=await User.findOne({
            email:req.body.email
        })

        if(user){
            return res.status(400).json({
                message:"User Already Exists"
            });
        }
        let bcryptPassword=await bcrypt.hash(req.body.password,8);
        req.body.password=bcryptPassword;
        user=new User(req.body)
        await user.save();
        const email=req.body.email;
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
            expiresIn:"1d",
        });
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,
        })
        return res.status(200).json({msg:"user created"});

    }
    catch(error){
        console.log(error);
        res.status(500).send({message:"Something went wrong"})
    }
})
export default router;

