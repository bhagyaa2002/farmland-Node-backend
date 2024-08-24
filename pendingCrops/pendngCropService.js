import { pendingCropModel } from "./pendingCropModel.js";
import e, { request, response } from "express";

export const addPendingCrop = async(request,response)=>{
    console.log("inside pending crop upload service");
  try {
    const { cropName } = request.body.cropName;

    const result = await pendingCropModel.findOne({ cropName: cropName });

    if (result) {
      response.send({ message: "pending crop already exist" });
    } else {
      const data = new pendingCropModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded pending crop", id: save._id });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}


export const updatePendingCrop = async (request, response) => {
    console.log("inside pending crop update service");
    try {
        const { cropName, ...updateData } = request.body; // Extract cropName and the rest of the data

        const result = await pendingCropModel.findOneAndUpdate(
            { cropName: cropName }, // Filter criteria
            { $set: updateData },   // Data to update
            { new: true, runValidators: true } // Options: return the updated document, run validators
        );

        if (result) {
            response.send({ message: "Successfully updated pending crop", data: result._id });
        } else {
            response.status(404).send({ message: "pending Crop not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const deletePendingCrop = async (request, response) => {
    console.log("inside pending crop delete service");
    try {
        const { cropName } = request.body; // Extract cropName from the request body

        const result = await pendingCropModel.findOneAndDelete({ cropName: cropName }); // Find and delete the crop

        if (result) {
            response.send({ message: "Successfully deleted pending crop", data: result._id });
        } else {
            response.status(404).send({ message: "pending Crop not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const getAllPendingCrops = async (request, response) => {
    console.log("inside get all pending crops service");
    try {
        const crops = await pendingCropModel.find(); // Retrieve all crop documents

        response.send({ message: "Successfully fetched all pending crops", data: crops });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};