import mongoose,{Document,Schema} from "mongoose";

export type UserType={
    _id:string;
    email:string;
    password:string;
    confirmPassword:string;
    firstname:string;
    lastname:string;
}

const userSchema=new mongoose.Schema({
    email:{type:String ,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true}
});

const User=mongoose.model<UserType>("User",userSchema);


export default User;