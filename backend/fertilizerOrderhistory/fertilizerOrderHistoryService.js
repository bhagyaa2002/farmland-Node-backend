import { fertilizerOrderHistoryModel } from "./fertilizerOrderHistoryModel.js";

export const addFertilizerOrderHistory = async(request,response)=>{
    console.log("inside Fertilizer order history upload service");
  try {
    console.log("line 6", request.body);
      const data = new fertilizerOrderHistoryModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded to crop order history", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const fetchFertilizerOrderHistoryByUser = async(request,response)=>{
    console.log("inside fetchFertilizerOrderHistoryByUser service");
    try {
        const { orderedBy } = request.body;
    
        const result = await fertilizerOrderHistoryModel.find({ orderedBy: orderedBy });
    
          response.send({ message: "Successfully fetched crop orders for user", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const fetchFertilizerOrderHistoryBySeller = async(request,response)=>{
    console.log("inside fetchFertilizerOrderHistoryBySeller service");
    try {
        const { soldBy } = request.body;
    
        const result = await fertilizerOrderHistoryModel.find({ soldBy: soldBy });
    
        response.send({ message: "Successfully fetched crop orders for seller", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const getAllFertilizerOrderTransaction = async (request, response) => {
  console.log("inside get all fertilizer Order service");
  try {

      const fertilizerOrder = await fertilizerOrderHistoryModel.find();
      response.send({ message: "Successfully fetched all fertilizerOrder", data: fertilizerOrder });
  } catch (error) {
      console.error(error);
      response.status(500).send({ message: "Internal Server Error" });
  }
};