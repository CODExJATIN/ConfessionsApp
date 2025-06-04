import mongoose, { Schema } from "mongoose";

const confessionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 280, // Max length for a confession (like a tweet)
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    college: {
      type: String,
      required: true,
      enum: ["ldce", "sal"],
      lowercase: true, // ensures values are stored in lowercase
    },
    Likes:[{
      type: Schema.Types.ObjectId,
      ref: "Like"
    }],
    Comments:[{
      type: Schema.Types.ObjectId,
      ref:"Comment"
    }],
    tags: {
      type: [String], 
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export const Confession = mongoose.model("Confession", confessionSchema);

