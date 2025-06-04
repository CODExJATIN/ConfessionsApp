import express from "express";
import {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByUser,
  updateConfession,
  deleteConfession,
  createAnonymousConfession,
} from "../controllers/confession.controller.js";
import { VerifyJwt } from "../middlewares/Auth.middlewares.js";
const confessionRouter = express.Router();

confessionRouter.post("/createConfession", VerifyJwt, createConfession);
confessionRouter.post("/createAnonymousConfession", createAnonymousConfession);
confessionRouter.get("/", getAllConfessions);
confessionRouter.get("/:id", getConfessionById);
confessionRouter.get("/user/:userId", getConfessionsByUser);
confessionRouter.put("/:id", VerifyJwt, updateConfession);
confessionRouter.delete("/:id", VerifyJwt, deleteConfession);

export default confessionRouter;
