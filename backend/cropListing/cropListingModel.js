import mongoose from "mongoose";

const cropListingSchema = new mongoose.Schema({
    cropName: {
      type: String,
      required: true, 
    },
    cropImage: {
      type: String,
      required: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    marketRate: {
      type: Number,
      required: true,
    },
    supplierRate: {
      type: Number,
      required: true,
    },
    timeframe: {
      type: String,
      required: true,
    },
    cropType: {
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

 export const cropListingModel = mongoose.model("cropListing", cropListingSchema);