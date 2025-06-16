import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
let User_Schema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    FullName: {
      type: String,
      required: true,
      index: true,
    },
    Password: {
      type: String, 
      required: [true, "Password is required"]
    },
    RefreshToken: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    college: {
      type: String,
      enum: ["ldce", "sal", "gu","all"]
    }
  },
  { timestamps: true }
);

User_Schema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password,10)
  }
  next()
})

User_Schema.methods.isPasswordCorrect=async function (Password) {
 return await bcrypt.compare(Password,this.Password)
}

User_Schema.methods.generateAccessToken=async function (params) {
  // short lived access token
 return  jwt.sign({
   _id: this._id,
   email:this.Email,
   username:this.Username,
   fullname:this.FullName
  },
process.env.ACCESS_TOKEN_SECRET,
{expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
)
}
User_Schema.methods.generateRefreshToken=async function (params) {
  // short lived access token
 return  jwt.sign({
   _id: this._id
  },
process.env.REFRESH_TOKEN_SECRET,
{expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
)
}


export const User = mongoose.model("User", User_Schema);
