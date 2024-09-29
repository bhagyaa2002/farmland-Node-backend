import { cropOrderHistoryModel } from "./cropOrderHistoryModel.js";

export const addCropOrderHistory = async(request,response)=>{
    console.log("inside crop order history upload service");
  try {
    console.log("line 6",request.body);
      const data = new cropOrderHistoryModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded to crop order history", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const fetchCropOrderHistoryByUser = async(request,response)=>{
    console.log("inside fetchCropOrderHistoryByUser service");
    try {
        const { orderedBy } = request.body;
    
        const result = await cropOrderHistoryModel.find({ orderedBy: orderedBy });
    
          response.send({ message: "Successfully fetched crop orders for user", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const fetchCropOrderHistoryBySeller = async(request,response)=>{
    console.log("inside fetchCropOrderHistoryBySeller service");
    try {
        const { soldBy } = request.body;
    
        const result = await cropOrderHistoryModel.find({ soldBy: soldBy });
    
        response.send({ message: "Successfully fetched crop orders for seller", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const getAllCropOrderTransaction = async (request, response) => {
  console.log("inside get all crop Order service");
  try {

      const cropOrder = await cropOrderHistoryModel.find().sort({ updatedAt: -1 });
      response.send({ message: "Successfully fetched all cropOrder", data: cropOrder });
  } catch (error) {
      console.error(error);
      response.status(500).send({ message: "Internal Server Error" });
  }
};