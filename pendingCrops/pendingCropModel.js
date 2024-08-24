import mongoose from "mongoose";
const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { _id: false });

const fertilizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { _id: false });

const pendingCropSchema = new mongoose.Schema({
    bannerImageUrl: {
      type: [String],
      required: false, 
    },
    category: {
      type: String,
      required: false,
    },
    cropImageUrl: {
      type: String,
      required: false,
    },
    cropname: {
      type: String,
      unique: true,
      required: false,
    },
    chemicalFertilizer: {
      type: [fertilizerSchema],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    disease: {
      type: [diseaseSchema],
      required: false,
    },
    harvesting: {
      type: [String],
      required: false,
    },
    irrigation: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    organicFertilizer: {
        type: [fertilizerSchema],
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    seeding: {
        type: [String],
        required: false,
    },
    soilPreparation: {
        type: [String],
        required: false,
    },
    soiltype: {
        type: String,
        required: false,
    },
    state: {
        type: [String],
        required: false,
    },
    subcrops: {
        type: [String],
        required: false,
    },
    temperature: {
        type: Number,
        required: false,
    },
    variety: {
        type: [String],
        required: false,
    },
    waterManagement: {
        type: [String],
        required: false,
    },
    youtubeLinks: {
        type: [String],
        required: false,
    }  

  },{ timestamps: false });

 export const pendingCropModel = mongoose.model("pendingcrop", pendingCropSchema);