import { cropModel } from "./cropModel.js";
import e, { request, response } from "express";

export const addCrop = async(request,response)=>{
    console.log("inside crop upload service");
  try {
    const { cropName } = request.body.cropName;

    const result = await cropModel.findOne({ cropName: cropName });

    if (result) {
      response.send({ message: "crop already exist" });
    } else {
      const data = new cropModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded crop", id: save._id });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}


export const updateCrop = async (request, response) => {
    console.log("inside crop update service");
    try {
        const { cropName, ...updateData } = request.body; // Extract cropName and the rest of the data

        const result = await cropModel.findOneAndUpdate(
            { cropName: cropName }, // Filter criteria
            { $set: updateData },   // Data to update
            { new: true, runValidators: true } // Options: return the updated document, run validators
        );

        if (result) {
            response.send({ message: "Successfully updated crop", data: result._id });
        } else {
            response.status(404).send({ message: "Crop not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const deleteCrop = async (request, response) => {
    console.log("inside crop delete service");
    try {
        const { cropName } = request.body; // Extract cropName from the request body

        const result = await cropModel.findOneAndDelete({ cropName: cropName }); // Find and delete the crop

        if (result) {
            response.send({ message: "Successfully deleted crop", data: result._id });
        } else {
            response.status(404).send({ message: "Crop not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const getAllCrops = async (request, response) => {
    console.log("inside get all crops service");
    try {
        const crops = await cropModel.find(); // Retrieve all crop documents

        response.send({ message: "Successfully fetched all crops", data: crops });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};