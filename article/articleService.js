import { articleModel } from "./articleModel.js";

export const addArticle = async(request,response)=>{
    console.log("inside add Article upload service");
  try {
    console.log("line 6",request.body);
      const data = new articleModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully upload article.", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const getAllArticle = async (request, response) => {
    console.log("inside get all article service");
    try {
        const article = await articleModel.find();
        response.send({ message: "Successfully fetched all article", data: article });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};