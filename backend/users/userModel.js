import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true, 
    },
    shop: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    }
  },{ timestamps: true });

 export const userModel = mongoose.model("user", userSchema);