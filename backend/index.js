import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./utils/mongoDB.js";
import { signUp, getUserDetails,login,updateUserPasswordByEmail } from "./users/userService.js";
import { addCrop,updateCrop,deleteCrop,getAllCrops } from "./crops/cropService.js";
import { addPendingCrop,updatePendingCrop,deletePendingCrop,getAllPendingCrops } from "./pendingCrops/pendngCropService.js";
import { addCropListing,updateCropListing,deleteCropListing,getAllCropListing,getOneCropListing} from "./cropListing/cropListingService.js";
import { addFertilizerListing,updateFertilizerListing,deleteFertilizerListing,getAllFertilizerListing,getOneFertlizerListing } from "./fertilizerlisting/fertilizerListingService.js";
import { addCropOrderHistory,fetchCropOrderHistoryByUser,fetchCropOrderHistoryBySeller,getAllCropOrderTransaction } from "./cropOrderHistory/cropOrderHistoryService.js";
import { addFertilizerOrderHistory,fetchFertilizerOrderHistoryByUser,fetchFertilizerOrderHistoryBySeller,getAllFertilizerOrderTransaction } from "./fertilizerOrderhistory/fertilizerOrderHistoryService.js";
import { addArticle,getAllArticle } from "./article/articleService.js";
import { addScheme,getAllScheme } from "./scheme/schemeService.js";
import { addNews,getAllNews } from "./news/newsService.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8080;
mongoConnection();

console.log("Backend port", PORT);

app.get("/", (request, response) => {
    response.send("Server is running");
});

app.post("/signup", (request, response) => {
  signUp(request, response);
});

app.post("/getUserDetails", (request, response) => {
  getUserDetails(request, response);
});
app.post("/login", (request, response) => {
    login(request, response);
  });
app.post("/resetPassword", (request, response) => {
    updateUserPasswordByEmail(request, response);
  });
app.post("/addCrop", (request, response) => {
    addCrop(request, response);
  });
app.post("/updateCrop", (request, response) => {
    updateCrop(request, response);
  });
  app.post("/deleteCrop", (request, response) => {
    deleteCrop(request, response);
  });
  app.get("/getAllCrops", (request, response) => {
    getAllCrops(request, response);
  });

  app.post("/addPendingCrop", (request, response) => {
    addPendingCrop(request, response);
  });
app.post("/updatePendingCrop", (request, response) => {
    updatePendingCrop(request, response);
  });
  app.post("/deletePendingCrop", (request, response) => {
    deletePendingCrop(request, response);
  });
  app.get("/getAllPendingCrops", (request, response) => {
    getAllPendingCrops(request, response);
  });

  app.post("/addCropListing", (request, response) => {
    addCropListing(request, response);
  });
app.post("/updateCropListing", (request, response) => {
  updateCropListing(request, response);
  });
  app.post("/deleteCropListing", (request, response) => {
    deleteCropListing(request, response);
  });
  app.get("/getAllCropListing", (request, response) => {
    getAllCropListing(request, response);
  });
  app.post("/getOneCropListing", (request, response) => {
    getOneCropListing(request, response);
  });


  app.post("/addFertilizerListing", (request, response) => {
    addFertilizerListing(request, response);
  });
app.post("/updateFertilizerListing", (request, response) => {
  updateFertilizerListing(request, response);
  });
  app.post("/deleteFertilizerListing", (request, response) => {
    deleteFertilizerListing(request, response);
  });
  app.get("/getAllFertilizerListing", (request, response) => {
    getAllFertilizerListing(request, response);
  });
  app.post("/getOneFertlizerListing", (request, response) => {
    getOneFertlizerListing(request, response);
  });
  app.post("/addCropOrderHistory", (request, response) => {
    addCropOrderHistory(request, response);
  });
  app.post("/fetchCropOrderHistoryByUser", (request, response) => {
    fetchCropOrderHistoryByUser(request, response);
  });
  app.post("/fetchCropOrderHistoryBySeller", (request, response) => {
    fetchCropOrderHistoryBySeller(request, response);
  });
  app.get("/getAllCropOrderTransaction", (request, response) => {
    getAllCropOrderTransaction(request, response);
  });
  app.post("/addFertilizerOrderHistory", (request, response) => {
    addFertilizerOrderHistory(request, response);
  });
  app.post("/fetchFertilizerOrderHistoryByUser", (request, response) => {
    fetchFertilizerOrderHistoryByUser(request, response);
  });
  app.post("/fetchFertilizerOrderHistoryBySeller", (request, response) => {
    fetchFertilizerOrderHistoryBySeller(request, response);
  });
  app.get("/getAllFertilizerOrderTransaction", (request, response) => {
    getAllFertilizerOrderTransaction(request, response);
  });
  app.post("/addArticle", (request, response) => {
    addArticle(request, response);
  });
  app.get("/getAllArticle", (request, response) => {
    getAllArticle(request, response);
  });

  app.post("/addScheme", (request, response) => {
    addScheme(request, response);
  });
  app.get("/getAllScheme", (request, response) => {
    getAllScheme(request, response);
  });
  
  app.post("/addNews", (request, response) => {
    addNews(request, response);
  });
  app.get("/getAllNews", (request, response) => {
    getAllNews(request, response);
  });
  
app.listen(PORT, () => console.log("server is running at port : " + PORT));
