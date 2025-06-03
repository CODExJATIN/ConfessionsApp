import mongoose from "mongoose";

const confession_Schema = new mongoose.Schema(
  {
    Text: {
      type: String,
      required: true,
      maxlength: 280,  // Limit the tweet to 280 characters
    },
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",  // Reference to the User model (author of the tweet)
      required: true,
    },
  },
  { timestamps: true }  // Automatically add 'createdAt' and 'updatedAt'
);

export const Confession = mongoose.model("Confession", confession_Schema);
