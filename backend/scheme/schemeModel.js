import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
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
    },
    type: {
      type: String,
      required: true,
    }
  },{ timestamps: true });

 export const schemeModel = mongoose.model("scheme", schemeSchema);