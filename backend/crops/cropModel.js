import mongoose from "mongoose";
const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false });

const fertilizerSchema = new mongoose.Schema({
    timePeriod: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false });

const cropSchema = new mongoose.Schema({
    bannerImageUrl: {
      type: String,
      required: true, 
    },
    category: {
      type: String,
      required: false,
    },
    cropImageurl: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      unique: true,
      required: true,
    },
    chemicalFertilizer: {
      type: [fertilizerSchema],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    disease: {
      type: [diseaseSchema],
      required: true,
    },
    harvesting: {
      type: [String],
      required: true,
    },
    irrigation: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organicFertilizer: {
        type: [fertilizerSchema],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seeding: {
        type: [String],
        required: true,
    },
    soilPreparation: {
        type: [String],
        required: true,
    },
    soilType: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    subCrops: {
        type: [String],
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    variety: {
        type: [String],
        required: true,
    },
    waterManagement: {
        type: [String],
        required: true,
    },
    youTubeLinks: {
        type: [String],
        required: true,
    }  

  },{ timestamps: true });

 export const cropModel = mongoose.model("crop", cropSchema);