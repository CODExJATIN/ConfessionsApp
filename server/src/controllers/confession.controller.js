import { Confession } from "../models/confession.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js"; 
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js"; 

export const createConfession = AsyncHandler(async (req, res) => {
  const { text} = req.body;
  const userId = req.user?._id;

  if (!text) {
    throw new ApiError(400, "Confession text is required.");
  }

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not found.");
  }

  const newConfession = await Confession.create({
    Text:text,
    Owner: userId,
  });

  return res.status(201).json(new ApiResponse(201, "Confession created successfully", newConfession));
});


// 1. Get all confessions
export const getAllConfessions = AsyncHandler(async (req, res) => {
  const confessions = await Confession.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, "Confessions fetched successfully", confessions));
});

// 2. Get confession by ID
export const getConfessionById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const confession = await Confession.findById(id);
  if (!confession) throw new ApiError(404, "Confession not found");
  res.status(200).json(new ApiResponse(200, "Confession fetched successfully", confession));
});

// 3. Get confessions by user
export const getConfessionsByUser = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const confessions = await Confession.find({ Owner: userId }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, "User confessions fetched successfully", confessions));
});

// 4. Update confession
export const updateConfession = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user?._id;

  if (!text) throw new ApiError(400, "Confession text is required.");

  const confession = await Confession.findById(id);
  if (!confession) throw new ApiError(404, "Confession not found");

  if (confession.Owner.toString() !== userId.toString()) throw new ApiError(403, "Not authorized to update this confession");

  confession.Text = text;
  await confession.save();

  res.status(200).json(new ApiResponse(200, "Confession updated successfully", confession));
});

// 5. Delete confession
export const deleteConfession = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const confession = await Confession.findById(id);
  if (!confession) throw new ApiError(404, "Confession not found");

  if (confession.Owner.toString() !== userId.toString()) throw new ApiError(403, "Not authorized to delete this confession");

  await confession.deleteOne();

  res.status(200).json(new ApiResponse(200, "Confession deleted successfully"));
});


export {
  createConfession,
  getConfessionById,
  getConfessionsByUser,
  getAllConfessions,
  updateConfession,
  deleteConfession,
};