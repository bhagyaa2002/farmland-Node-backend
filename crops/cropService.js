import { cropModel } from "./cropModel.js";
import e, { request, response } from "express";

export const addCrop = async(request,response)=>{
    console.log("inside crop upload service");
  try {
    console.log("line 7",request.body)
    const { cropname } = request.body.cropname;

    const result = await cropModel.findOne({ cropname: cropname });
    
    // const formattedChemicalData = (request.body.chemicalFertilizer || []).map(item => {
    //     const monthRange = Object.keys(item);
    //     const description = item[monthRange];
    //     const name=monthRange[0];
    //     return { name, description };
    //   });
    // const formattedOrganicData = (request.body.organicFertilizer || []).map(item => {
    //     const monthRange = Object.keys(item);
    //     const description = item[monthRange];
    //     const name=monthRange[0];
    //     return { name, description };
    //   });
    //   const formattedDiseaseData = (request.body.disease || []).map(item => {
    //     const monthRange = Object.keys(item);
    //     const description = item[monthRange];
    //     const name=monthRange[0];
    //     return { name, description };
    //   });
    // request.body.chemicalFertilizer=formattedChemicalData;
    // request.body.organicFertilizer=formattedOrganicData;
    // request.body.disease=formattedDiseaseData;
    console.log("line 33",request.body);
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
        const { cropname, ...updateData } = request.body; // Extract cropname and the rest of the data

        const result = await cropModel.findOneAndUpdate(
            { cropname: cropname }, // Filter criteria
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
        const { cropname } = request.body; // Extract cropname from the request body

        const result = await cropModel.findOneAndDelete({ cropname: cropname }); // Find and delete the crop

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
        // Format the data to match the format used in the 'addCrop' function
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
      
      response.send({ message: "Successfully fetched all crops", data: formattedCrops });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};

