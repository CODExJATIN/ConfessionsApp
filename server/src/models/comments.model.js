import mongoose, { Schema } from "mongoose";
const Comment_Schema = new mongoose.Schema(
  {
    Text: {
      type: String,
      required: true, 
    },
    Confession: {
      type: Schema.Types.ObjectId,
      ref: "Confession",  
      required: true,  
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",  
      required: true, 
    },
  },
  { timestamps: true }  
);
export const Comment = mongoose.model("Comment", Comment_Schema);