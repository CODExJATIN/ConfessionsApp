import { Like } from "../models/likes.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js"; 
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js"; 

// Like a confession
export const likeConfession = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id: confessionId } = req.params;

  // Check if already liked
  const existingLike = await Like.findOne({ LikedBy: userId, Confession: confessionId });
  if (existingLike) {
    throw new ApiError(400, "You have already liked this confession");
  }

  const like = await Like.create({ LikedBy: userId, Confession: confessionId });
  res.status(201).json(new ApiResponse(201, "Confession liked successfully", like));
});

// Unlike a confession
export const unlikeConfession = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id: confessionId } = req.params;

  const like = await Like.findOne({ LikedBy: userId, Confession: confessionId });
  if (!like) {
    throw new ApiError(404, "Like not found");
  }

  await Like.deleteOne({ LikedBy: userId, Confession: confessionId });

  res.status(200).json(new ApiResponse(200, "Confession unliked successfully"));
});

// 1. Get total likes count for a confession
export const getLikesCount = AsyncHandler(async (req, res) => {
  const { id: confessionId } = req.params;
  const count = await Like.countDocuments({ Confession: confessionId });
  res.status(200).json(new ApiResponse(200, "Likes count fetched", { count }));
});

// 2. Get all likes by a user (confessions and comments)
export const getLikesByUser = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const likes = await Like.find({ LikedBy: userId });
  res.status(200).json(new ApiResponse(200, "User likes fetched", likes));
});

// 3. Check if logged-in user liked a confession
export const isConfessionLikedByUser = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id: confessionId } = req.params;
  const like = await Like.findOne({ LikedBy: userId, Confession: confessionId });
  res.status(200).json(new ApiResponse(200, "Like status fetched", { liked: !!like }));
});

// 4. Get all users who liked a confession
export const getUsersWhoLikedConfession = AsyncHandler(async (req, res) => {
  const { id: confessionId } = req.params;
  const likes = await Like.find({ Confession: confessionId }).populate("LikedBy", "Username Email"); 
  res.status(200).json(new ApiResponse(200, "Users who liked fetched", likes.map(like => like.LikedBy)));
});

