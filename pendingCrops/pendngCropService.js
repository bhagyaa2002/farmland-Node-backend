import { pendingCropModel } from "./pendingCropModel.js";
import e, { request, response } from "express";

export const addPendingCrop = async(request,response)=>{
    console.log("inside pending crop upload service");
  try {
    const { cropname } = request.body.cropname;
    console.log("line 8", request.body);

    const result = await pendingCropModel.findOne({ cropname: cropname });
    const formattedChemicalData = (request.body.chemicalFertilizer || []).map(item => {
        const monthRange = Object.keys(item);
        const description = item[monthRange];
        const name=monthRange[0];
        return { name, description };
      });
    const formattedOrganicData = (request.body.organicFertilizer || []).map(item => {
        const monthRange = Object.keys(item);
        const description = item[monthRange];
        const name=monthRange[0];
        return { name, description };
      });
      const formattedDiseaseData = (request.body.disease || []).map(item => {
        const monthRange = Object.keys(item);
        const description = item[monthRange];
        const name=monthRange[0];
        return { name, description };
      });
    request.body.chemicalFertilizer=formattedChemicalData;
    request.body.organicFertilizer=formattedOrganicData;
    request.body.disease=formattedDiseaseData;

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
        const { cropname, ...updateData } = request.body; // Extract cropname and the rest of the data

        const result = await pendingCropModel.findOneAndUpdate(
            { cropname: cropname }, // Filter criteria
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
        const { cropname } = request.body; // Extract cropname from the request body
        console.log("line 52",request.body);
        const result = await pendingCropModel.findOneAndDelete({ cropname: cropname }); // Find and delete the crop

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
        const formattedCrops = crops.map(crop => {
            const formattedChemicalData = crop.chemicalFertilizer.map(item => ({
              [item.name]: item.description
            }));
      
            const formattedOrganicData = crop.organicFertilizer.map(item => ({
              [item.name]: item.description
            }));
      
            const formattedDiseaseData = crop.disease.map(item => ({
              [item.name]: item.description
            }));
      
            return {
              ...crop._doc, // Spread the original crop document
              chemicalFertilizer: formattedChemicalData,
              organicFertilizer: formattedOrganicData,
              disease: formattedDiseaseData
            };
          });

        response.send({ message: "Successfully fetched all pending crops", data: crops });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};