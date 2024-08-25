import { fertilizerListingModel } from "./fertilizerListingModel.js";
import e, { request, response } from "express";

export const addFertilizerListing = async(request,response)=>{
    console.log("inside fertilizer Listing upload service");
  try {
    console.log("line 7",request.body);
      const data = new fertilizerListingModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded to fertilizer listing", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const updateFertilizerListing = async (request, response) => {
    console.log("inside fertilizer Listing update service");
    try {
        const { _id, ...updateData } = request.body; // Extract cropName and the rest of the data

        const result = await fertilizerListingModel.findOneAndUpdate(
            { _id: _id }, // Filter criteria
            { $set: updateData },   // Data to update
            { new: true, runValidators: true } // Options: return the updated document, run validators
        );

        if (result) {
            response.send({ message: "Successfully updated fertilizer listing", data: result._id });
        } else {
            response.status(404).send({ message: "Crop not found in croplisting" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const deleteFertilizerListing = async (request, response) => {
    console.log("inside fertilizer Listing delete service");
    try {
        const { _id } = request.body; // Extract cropName from the request body
        const result = await fertilizerListingModel.findOneAndDelete({ _id: _id }); // Find and delete the crop
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

export const getAllFertilizerListing = async (request, response) => {
    console.log("inside get all fertilizer Listing service");
    try {
        const fertilizers = await fertilizerListingModel.find(); // Retrieve all crop documents
        response.send({ message: "Successfully fetched all crops", data: fertilizers });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

export const getOneFertlizerListing = async (request, response) => {
    console.log("inside get one fertilizer Listing service");

    try {

        const { _id} = request.body;
        console.log("line 73",request.body);
        const result = await fertilizerListingModel.findById(_id);
    if (result) {
      response.send({ message: "Crop from fertilizerlisting Fetched Successfully",data:result });
    } else {
      response.status(404).send({ message: "Crop not found for the id: "+_id});
    }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};