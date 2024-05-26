import mongoose from "mongoose";

const fertilizerListingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, 
    },
    image: {
      type: String,
      required: false,
    },
    marketRate: {
      type: Number,
      required: true,
    },
    offerRate: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    marketOwnerEmailId: {
      type: String,
      required: true,
    },
    remainingQuantity: {
        type: Number,
        required: true,
      }
  },{ timestamps: true });

 export const fertilizerListingModel = mongoose.model("fertilizerListing", fertilizerListingSchema);