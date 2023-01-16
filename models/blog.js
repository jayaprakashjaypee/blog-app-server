import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: { type: Date, default: new Date() },
  likeCount: { type: Number, default: 0 },
});

const BlogModal = mongoose.model("Blog", blogSchema);

export default BlogModal;
