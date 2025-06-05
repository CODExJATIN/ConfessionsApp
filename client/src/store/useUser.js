import { create } from "zustand";



export const useUser=create((set)=>({
    user:{
        username:"",
        email:"",
        fullname:""
    },
    setUser:(newUser)=>set(()=>({user:newUser}))
}))