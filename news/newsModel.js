import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  }
  },{ timestamps: true });

 export const newsModel = mongoose.model("news", newsSchema);