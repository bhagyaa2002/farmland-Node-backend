import { cropListingModel } from "./cropListingModel.js";
import e, { request, response } from "express";
import mongoose from "mongoose";

export const addCropListing = async(request,response)=>{
    console.log("inside crop Listing upload service");
  try {
      const data = new cropListingModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded to crop listing", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const updateCropListing = async (request, response) => {
    console.log("inside crop Listing update service");
    try {
        const { _id, ...updateData } = request.body; // Extract cropName and the rest of the data

        const result = await cropListingModel.findOneAndUpdate(
            { _id: _id }, // Filter criteria
            { $set: updateData },   // Data to update
            { new: true, runValidators: true } // Options: return the updated document, run validators
        );

        if (result) {
            response.send({ message: "Successfully updated crop listing", data: result._id });
        } else {
            response.status(404).send({ message: "Crop not found in croplisting" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const deleteCropListing = async (request, response) => {
    console.log("inside crop Listing delete service");
    try {
        const { _id } = request.body; // Extract cropName from the request body
        const result = await cropListingModel.findOneAndDelete({ _id: _id }); // Find and delete the crop
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

export const getAllCropListing = async (request, response) => {
    console.log("inside get all crops Listing service");
    try {
        const crops = await cropListingModel.find(); // Retrieve all crop documents
        response.send({ message: "Successfully fetched all crops", data: crops });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const getOneCropListing = async (request, response) => {
    console.log("inside get one crops Listing service");

    try {
        const { _id} = request.body;
        const result = await cropListingModel.findById(_id);
    if (result) {
      response.send({ message: "Crop from croplisting Fetched Successfully",data:result });
    } else {
      response.status(404).send({ message: "Crop not found for the id: "+_id});
    }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};