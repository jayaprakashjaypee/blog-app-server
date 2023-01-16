import BlogModal from "../models/blog.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlog = new BlogModal({
    ...blog,
    createdAt: new Date().toISOString(),
  });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModal.find();
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const particularBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getBlogByUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist " });
    }
    const userBlog = await BlogModal.find({ creator: id });
    res.status(200).json(userBlog);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Blog exist with id ${id} ` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Blog exist with id ${id} ` });
    }
    const updatedBlog = {
      creator,
      title,
      description,
      imageFile,
      tags,
      _id: id,
    };
    await BlogModal.findByIdAndUpdate(id, updatedBlog, { new: true });
    res.json({ updatedBlog });
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};
