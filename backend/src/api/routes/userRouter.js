import express from "express";
import { handlePostUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", handlePostUser);

export default router;
