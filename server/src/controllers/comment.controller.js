import { Comment } from "../models/comments.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js"; 
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js"; 

import { Confession } from "../models/confession.model.js";




// Create a comment
export const createComment = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { confessionId, text } = req.body;

  if (!text || !confessionId) {
    throw new ApiError(400, "Confession ID and text are required");
  }

  const comment = await Comment.create({
    User: userId,
    Confession: confessionId,
    Text: text,
  });

  //update the confession to include the new comment
  await Confession.findByIdAndUpdate(confessionId, {
    $push: { Comments: comment._id },
  });

  comment.populate("User","Username Email isAdmin")
  

  res.status(201).json(new ApiResponse(201, "Comment created", comment));
});

// Get comments by confession id
export const getCommentsByConfession = AsyncHandler(async (req, res) => {
  const { id: confessionId } = req.params;
  const comments = await Comment.find({ Confession: confessionId }).populate("User", "Username Email isAdmin");
  res.status(200).json(new ApiResponse(200, "Comments fetched", comments));
});

// Update comment (only owner)
export const updateComment = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id: commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new ApiError(400, "Text is required to update comment");
  }

  const comment = await Comment.findOne({ _id: commentId, User: userId });

  if (!comment) {
    throw new ApiError(404, "Comment not found or unauthorized");
  }

  comment.Text = text;
  await comment.save();

  res.status(200).json(new ApiResponse(200, "Comment updated", comment));
});

// Delete comment (only owner)
export const deleteComment = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id: commentId } = req.params;

  const comment = await Comment.findOneAndDelete({ _id: commentId, User: userId });

  if (!comment) {
    throw new ApiError(404, "Comment not found or unauthorized");
  }

  res.status(200).json(new ApiResponse(200, "Comment deleted",{}));
});

