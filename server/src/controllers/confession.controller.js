import { Confession } from "../models/confession.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js"; 
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js"; 

// 1. Create confession (authenticated user)
export const createConfession = AsyncHandler(async (req, res) => {
  const { text, collegeName, tags } = req.body;
  const userId = req.user?._id;

  if (!text) {
    throw new ApiError(400, "Confession text is required.");
  }
  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not found.");
  }

  const newConfession = await Confession.create({
    text,
    owner: userId,
    college: collegeName || "ldce", // Default to "ldce" if not provided
    tags: tags || [],
  });

  return res.status(201).json(new ApiResponse(201, "Confession created successfully", newConfession));
});

// 2. Create anonymous confession (owner not set)
export const createAnonymousConfession = AsyncHandler(async (req, res) => {
  const { text, collegeName, tags } = req.body;
 
  if (!text) {
    throw new ApiError(400, "Confession text is required.");
  }

  const newConfession = await Confession.create({
    text,
    college:collegeName,
    tags: tags || [],
  });

  return res.status(201).json(new ApiResponse(201, "Anonymous confession created successfully", newConfession));
});

// 3. Get all confessions with nested population
export const getAllConfessions = AsyncHandler(async (req, res) => {
  const confessions = await Confession.find()
    .populate("owner", "Username FullName")
    .populate({
      path: "Likes",
      populate: { path: "LikedBy", select: "Username FullName" },
    })
    .populate({
      path: "Comments",
      populate: { path: "User", select: "Username FullName" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "Confessions fetched successfully", confessions));
});

// 4. Get confession by ID with full population
export const getConfessionById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const confession = await Confession.findById(id)
    .populate("owner", "Username FullName")
    .populate({
      path: "Likes",
      populate: { path: "LikedBy", select: "Username FullName" },
    })
    .populate({
      path: "Comments",
      populate: { path: "User", select: "Username FullName" },
    });

  if (!confession) throw new ApiError(404, "Confession not found");
  res.status(200).json(new ApiResponse(200, "Confession fetched successfully", confession));
});

// 5. Get confessions by user
export const getConfessionsByUser = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const confessions = await Confession.find({ owner: userId })
    .populate("owner", "Username FullName")
    .populate({
      path: "Likes",
      populate: { path: "LikedBy", select: "Username FullName" },
    })
    .populate({
      path: "Comments",
      populate: { path: "User", select: "Username FullName" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "User confessions fetched successfully", confessions));
});

// 6. Update confession
export const updateConfession = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text, collegeName, tags } = req.body;
  const userId = req.user?._id;

  if (!text) throw new ApiError(400, "Confession text is required.");

  const confession = await Confession.findById(id);
  if (!confession) throw new ApiError(404, "Confession not found");

  if (confession.owner?.toString() !== userId.toString())
    throw new ApiError(403, "Not authorized to update this confession");

  confession.text = text;
  if (collegeName) confession.collegeName = collegeName;
  if (tags) confession.tags = tags;

  await confession.save();

  res.status(200).json(new ApiResponse(200, "Confession updated successfully", confession));
});

// 7. Delete confession
export const deleteConfession = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const confession = await Confession.findById(id);
  if (!confession) throw new ApiError(404, "Confession not found");

  if (confession.owner.toString() !== userId.toString())
    throw new ApiError(403, "Not authorized to delete this confession");

  await confession.deleteOne();

  res.status(200).json(new ApiResponse(200, "Confession deleted successfully", {}));
});

// 8. Get confessions by collegeName
export const getConfessionsByCollege = AsyncHandler(async (req, res) => {
  const { collegeName } = req.params;

  if (!collegeName) throw new ApiError(400, "College parameter is required");

  const confessions = await Confession.find({ college:collegeName })
    .populate("owner", "Username FullName")
    .populate({
      path: "Likes",
      populate: { path: "LikedBy", select: "Username FullName" },
    })
    .populate({
      path: "Comments",
      populate: { path: "User", select: "Username FullName" },
    })
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, "College confessions fetched successfully", confessions));
});