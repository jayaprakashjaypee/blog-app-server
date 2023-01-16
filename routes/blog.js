import express from "express";
const router = express.Router();

import {
  createBlog,
  getBlog,
  particularBlog,
  getBlogByUser,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.js";

router.post("/", createBlog);
router.get("/", getBlog);
router.get("/:id", particularBlog);
router.get("/userBlog/:id", getBlogByUser);
router.delete("/delete/:id", deleteBlog);
router.patch("/:id", updateBlog);
export default router;
