import mongoose from "mongoose";

const cropListingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, 
    },
    url: {
      type: String,
      required: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    requiredtime: {
      type: String,
      required: true,
    },
    croptype: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reamining: {
        type: Number,
        required: true,
      }
  },{ timestamps: true });

 export const cropListingModel = mongoose.model("cropListing", cropListingSchema);