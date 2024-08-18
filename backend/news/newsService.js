import { newsModel } from "./newsModel.js";

export const addNews = async(request,response)=>{
    console.log("inside add News upload service");
  try {
    console.log("line 6",request.body);
      const data = new newsModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully upload news.", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const getAllNews = async (request, response) => {
    console.log("inside get all article service");
    try {

        const news = await newsModel.find();
        response.send({ message: "Successfully fetched all news", data: news });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
};