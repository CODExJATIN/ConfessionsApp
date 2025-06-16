import { create } from "zustand";



export const useUser=create((set)=>({
    user:{
        username:"",
        email:"",
        fullname:"",
        isAdmin:false,
        college:""
    },
    setUser:(newUser)=>set(()=>({user:newUser}))
}))