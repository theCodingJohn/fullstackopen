import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

export default mongoose.model("Blog", blogSchema);
