import express from "express";
import threadsModel from "../models/threads.model.js";
import {deleteThread, getAllThreads, thread,chatGeneration} from "../controllers/ThreadsController.js";
const chatRouter = express.Router();


chatRouter.get("/thread", getAllThreads);
chatRouter.get("/thread/:threadId",thread)
chatRouter.delete("/thread/:threadId",deleteThread)
chatRouter.post("/chat",chatGeneration)
export default chatRouter;
