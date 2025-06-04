import { create } from "zustand";



export const useUser=create((set)=>({
    user:{
        username:"",
        email:""
    },
    setUser:(newUser)=>set(()=>({user:newUser}))
}))