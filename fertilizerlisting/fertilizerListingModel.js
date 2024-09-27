import mongoose from "mongoose";

const fertilizerListingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, 
    },
    url: {
      type: String,
      required: false,
    },
    mrp: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    categori: {
      type: String,
      required: true,
    },
    fertilizertype: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    quantity: {
        type: String,
        required: true,
      },
      NoOfItemsAvailable: {
        type: Number,
        required: true,
      }
  },{ timestamps: true });

 export const fertilizerListingModel = mongoose.model("fertilizerListing", fertilizerListingSchema);