import mongoose from "mongoose";

const cropOrderHistorySchema = new mongoose.Schema({
    cropId: {
      type: String,
      required: true, 
    },
    quantity: {
      type: Number,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    orderedBy: {
      type: String,
      required: true,
    },
    soldBy: {
      type: String,
      required: true,
    },
    orderDateTime: {
      type: String,
      required: true,
    },
  },{ timestamps: true });

 export const cropOrderHistoryModel = mongoose.model("cropOrderHistory", cropOrderHistorySchema);