import express from "express";
import {
   User_registeration,
   User_login,
  RefreshAccessToken,
  Log_Out_User,
  Update_Password,
  Update_Account_Details,
  Current_User,
} from "../controllers/User.controller.js"
import { VerifyJwt } from "../middlewares/Auth.middlewares.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", User_registeration); // Registration route
userRouter.post("/login", User_login); // Login route
userRouter.post("/refresh-token", RefreshAccessToken); // Token refresh route

// Protected Routes (Require Authentication)
userRouter.post("/logout", VerifyJwt, Log_Out_User); // Logout route
userRouter.patch("/update-password", VerifyJwt, Update_Password); // Update password
userRouter.patch("/update-account", VerifyJwt, Update_Account_Details); // Update account details
userRouter.get("/current-user", VerifyJwt, Current_User); // Get current user details

export default userRouter;

