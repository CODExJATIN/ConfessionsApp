import express from "express";
import {
  likeConfession,
  unlikeConfession,
  getLikesCount,
  getLikesByUser,
  isConfessionLikedByUser,
  getUsersWhoLikedConfession,
} from "../controllers/like.controller.js";
import { VerifyJwt } from "../middlewares/Auth.middlewares.js";
const likeRouter = express.Router();

likeRouter.post("/:id/like", VerifyJwt, likeConfession);
likeRouter.delete("/:id/unlike", VerifyJwt, unlikeConfession);
likeRouter.get("/:id/likes-count", getLikesCount);
likeRouter.get("/user-likes", VerifyJwt, getLikesByUser);
likeRouter.get("/:id/is-liked", VerifyJwt, isConfessionLikedByUser);
likeRouter.get("/:id/users-liked", getUsersWhoLikedConfession);

export default likeRouter;
