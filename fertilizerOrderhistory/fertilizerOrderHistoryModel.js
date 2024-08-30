import mongoose from "mongoose";

const timestampSchema = new mongoose.Schema({
  seconds: {
      type: String,
      required: false
  },
  nanoseconds: {
      type: String,
      required: false
  }
}, { _id: false });
const fertilizerOrderHistorySchema = new mongoose.Schema({
    cropName: {
      type: String,
      required: true, 
    },
    Quantity: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    Total: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    buyerName: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    timestamp:{
      type: timestampSchema,
      required: false
    }
  },{ timestamps: true });

 export const fertilizerOrderHistoryModel = mongoose.model("fertilizerOrderHistory", fertilizerOrderHistorySchema);