import {useForm,} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
// const API_BASE_URL:string=import.meta.env.VITE_API_BASE_URL;

export type RegisterFormData={
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirmPassword:string
}
const Register= ()=>{
    const navigate=useNavigate();
    const {showToast}=useAppContext();
    const {register,watch,handleSubmit,formState:{errors}}=useForm<RegisterFormData>();


    const mutation=useMutation(apiClient.register,{
        onSuccess:()=>{
            showToast({message:"Registration Success!",type:"SUCCESS"});
            navigate("/");
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"});

        }
    });


    const onSubmit=handleSubmit( async(data)=>{
        console.log(data)
        mutation.mutate(data);
        // const response=await fetch("http://localhost:4000/api/users/register",{
        //     method:'post',
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        //     body:JSON.stringify(data),
        // });
        // const responseBody=await response.json();
        // if(!response.ok){
        //     throw new Error(responseBody.message)
        // }
        // else{
        //     console.log("Successful")
        // }
    })
    return(
        <form method="post" className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            
            <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            First Name
            <input className="border rounded w-full py-1 px-2 font-normal" type="text" 
            {...register("firstname",{required:"This field is required"})}/>
            {errors.firstname && (<span className='text-red-500'>{errors.firstname.message}</span>) }
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Last Name
            <input className="border rounded w-full py-1 px-2 font-normal" type="text" 
            {...register("lastname",{required:"This field is required"})} />
            {errors.lastname && (<span className='text-red-500'>{errors.lastname.message}</span>) }

        </label>
        </div>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Email
            <input className="border rounded w-full py-1 px-2 font-normal" type="email" 
            {...register("email",{required:"This field is required"})} />
            {errors.email && (<span className='text-red-500'>{errors.email.message}</span>) }

        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Password
            <input className="border rounded w-full py-1 px-2 font-normal" type="password" 
            {...register("password",{required:"This field is required",minLength:{value:6,message:"password must be 6 characters"}})} />
            {errors.password && (<span className='text-red-500'>{errors.password.message}</span>) }

        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Confirm Password
            <input className="border rounded w-full py-1 px-2 font-normal" type="password" 
            {...register("confirmPassword",{validate:(val)=>{
                if(!val){
                    return "This field is required"
                }
                else if(watch("password")!==val){
                    return "Your Password didn't match"
                }

            }})} />
            {errors.confirmPassword && (<span className='text-red-500'>{errors.confirmPassword.message}</span>) }

        </label>
            <span>
                <button
                type="submit"
                className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>Create Account</button>
            </span>
        </form>
    )
}
export default Register;

// new github code 
// import { useForm } from "react-hook-form";
// import { useMutation } from "react-query";
// // , useQueryClient
// import * as apiClient from "../api-client";
// // import { useAppContext } from "../contexts/AppContext";
// // import { useNavigate } from "react-router-dom";

// export type RegisterFormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// const Register = () => {
// //   const queryClient = useQueryClient();
// //   const navigate = useNavigate();
// //   const { showToast } = useAppContext();

//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>();

//   const mutation = useMutation(apiClient.register, {
    
//     onSuccess: async () => {
//     //   showToast({ message: "Registration Success!", type: "SUCCESS" });
//     //   await queryClient.invalidateQueries("validateToken");
//     //   navigate("/");
//     console.log("registration successful");
//     },
//     onError: (error: Error) => {
//     //   showToast({ message: error.message, type: "ERROR" });
//     console.log(error.message);
//     },
//   });

//   const onSubmit = handleSubmit((data) => {
//     // console.log(data)
//     // const data1=JSON.parse(data);
//     mutation.mutate(data);
//     console.log("check point-1")
//   });

//   return (
//     <form className="flex flex-col gap-5" onSubmit={onSubmit}>
//       <h2 className="text-3xl font-bold">Create an Account</h2>
//       <div className="flex flex-col md:flex-row gap-5">
//         <label className="text-gray-700 text-sm font-bold flex-1">
//           First Name
//           <input
//             className="border rounded w-full py-1 px-2 font-normal"
//             {...register("firstName", { required: "This field is required" })}
//           ></input>
//           {errors.firstName && (
//             <span className="text-red-500">{errors.firstName.message}</span>
//           )}
//         </label>
//         <label className="text-gray-700 text-sm font-bold flex-1">
//           Last Name
//           <input
//             className="border rounded w-full py-1 px-2 font-normal"
//             {...register("lastName", { required: "This field is required" })}
//           ></input>
//           {errors.lastName && (
//             <span className="text-red-500">{errors.lastName.message}</span>
//           )}
//         </label>
//       </div>
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Email
//         <input
//           type="email"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("email", { required: "This field is required" })}
//         ></input>
//         {errors.email && (
//           <span className="text-red-500">{errors.email.message}</span>
//         )}
//       </label>
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Password
//         <input
//           type="password"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("password", {
//             required: "This field is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           })}
//         ></input>
//         {errors.password && (
//           <span className="text-red-500">{errors.password.message}</span>
//         )}
//       </label>
//       <label className="text-gray-700 text-sm font-bold flex-1">
//         Confirm Password
//         <input
//           type="password"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("confirmPassword", {
//             validate: (val) => {
//               if (!val) {
//                 return "This field is required";
//               } else if (watch("password") !== val) {
//                 return "Your passwords do no match";
//               }
//             },
//           })}
//         ></input>
//         {errors.confirmPassword && (
//           <span className="text-red-500">{errors.confirmPassword.message}</span>
//         )}
//       </label>
//       <span>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
//         >
//           Create Account
//         </button>
//       </span>
//     </form>
//   );
// };

// export default Register;