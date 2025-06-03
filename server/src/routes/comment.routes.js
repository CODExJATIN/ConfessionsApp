import express from "express";
import { VerifyJwt } from "../middlewares/Auth.middlewares";
import {
  createComment,
  getCommentsByConfession,
  updateComment,
  deleteComment,
} from "../controllers/comments.controller.js";

const commentRouter = express.Router();

// Create a comment (requires auth)
commentRouter.post("/", VerifyJwt, createComment);

// Get comments by confession ID (no auth needed)
commentRouter.get("/confession/:id", getCommentsByConfession);

// Update comment by comment ID (requires auth)
commentRouter.put("/:id", VerifyJwt, updateComment);

// Delete comment by comment ID (requires auth)
commentRouter.delete("/:id", VerifyJwt, deleteComment);

export default commentRouter;
