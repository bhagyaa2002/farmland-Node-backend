import { schemeModel } from "./schemeModel.js";

export const addScheme = async(request,response)=>{
    console.log("inside add scheme upload service");
  try {
      const data = new schemeModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully upload scheme.", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const getAllScheme = async (request, response) => {
    console.log("inside get all Scheme  service");
    try {
        const scheme  = await schemeModel.find();
        response.send({ message: "Successfully fetched all Scheme ", data: scheme });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};