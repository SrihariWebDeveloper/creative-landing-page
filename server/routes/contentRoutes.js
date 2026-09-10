import express from "express";

import {
  getContent,
  createContent,
  updateContent
} from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getContent);

router.post("/", createContent);

router.put("/:id", updateContent);

export default router;