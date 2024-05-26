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
    imageUrl: {
      type: String,
      required: true,
    },
    articleUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },{ timestamps: true });

 export const newsModel = mongoose.model("news", newsSchema);