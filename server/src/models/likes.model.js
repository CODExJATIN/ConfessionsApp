import mongoose from "mongoose";

const like_Schema = new mongoose.Schema(
  {
    LikedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",  // Reference to the User who liked the content
      required: true,
    },
    Confession: {
      type: Schema.Types.ObjectId,
      ref: "Confession",  
      required: false,  
    },
  },
  { timestamps: true }  // Automatically add 'createdAt' and 'updatedAt'
);

export const Like = mongoose.model("Like", like_Schema);