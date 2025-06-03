import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './routes/HealthChecker.routes.js';
import userRouter from './routes/User.routes.js';
import likeRouter from './routes/Like.routes.js';
import confessionRouter from './routes/confession.routes.js';
import commentRouter from './routes/comment.routes.js';

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,  
    credentials: true,              
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/v1/healthchecker",router)
app.use("api/v1/user-routes", userRouter)
app.use("api/v1/like-routes", likeRouter)
app.use("api/v1/confession-routes", confessionRouter)
app.use("api/v1/comment-routes", commentRouter)
export default app