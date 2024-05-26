import mongoose from "mongoose";

const fertilizerOrderHistorySchema = new mongoose.Schema({
    fertilizerId: {
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

 export const fertilizerOrderHistoryModel = mongoose.model("fertilizerOrderHistory", fertilizerOrderHistorySchema);