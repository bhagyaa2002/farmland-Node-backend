import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./utils/mongoDB.js";
import { signUp, getUserDetails,login,updateUserPasswordByEmail,forgotPassword } from "./users/userService.js";
import { addCrop,updateCrop,deleteCrop,getAllCrops } from "./crops/cropService.js";
import { addPendingCrop,updatePendingCrop,deletePendingCrop,getAllPendingCrops } from "./pendingCrops/pendngCropService.js";
import { addCropListing,updateCropListing,deleteCropListing,getAllCropListing,getOneCropListing} from "./cropListing/cropListingService.js";
import { addFertilizerListing,updateFertilizerListing,deleteFertilizerListing,getAllFertilizerListing,getOneFertlizerListing } from "./fertilizerlisting/fertilizerListingService.js";
import { addCropOrderHistory,fetchCropOrderHistoryByUser,fetchCropOrderHistoryBySeller,getAllCropOrderTransaction } from "./cropOrderHistory/cropOrderHistoryService.js";
import { addFertilizerOrderHistory,fetchFertilizerOrderHistoryByUser,fetchFertilizerOrderHistoryBySeller,getAllFertilizerOrderTransaction } from "./fertilizerOrderhistory/fertilizerOrderHistoryService.js";
import { addArticle,getAllArticle } from "./article/articleService.js";
import { addScheme,getAllScheme } from "./scheme/schemeService.js";
import { addNews,getAllNews } from "./news/newsService.js";
import {addCart, deleteCartByUser, updateCartById, fetchCartByUser} from "./cart/cartService.js"
import Stripe from "stripe";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8080;
mongoConnection();
const stripe = new Stripe("sk_test_51OYphVSIebbx1BJCNAITeg0nA6CaflgvU4TmUBZfiJ7v0mFa4XMtvDQKbwpxFiJcOI7k0RKFbqXpuWNllRaWSdhQ00Kx8aNwVJ");
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
  app.post("/forgotPassword", (request, response) => {
    forgotPassword(request, response);
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

  app.post("/checkout",async(request,response)=>{
    const data=request.body;
    console.log("line 148",data);
    const quantity1 = Number(data.quantity);
const offerPrice = Number(data.offerPrice);
    const totalAmount=quantity1* offerPrice ;
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1OYqeFSIebbx1BJCVma4TXJL" }],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: data.name,
              // images: [data.image], // Uncomment and use if you have an image
            },
            unit_amount: data.offerPrice * 100, // Convert to smallest currency unit (e.g., paise)
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: data.quantity,
        },
      ],
      success_url: `http://localhost:3000/buysucess/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
       metadata: {
            id: data.id, // Include the id in the metadata
            owner: data.owner,
            name: data.name,
            quantity: data.quantity,
            offerPrice: data.offerPrice,
            farmerName: data.farmerName,
            totalAmount: totalAmount,
            email:data.email

        }
    };
     const session = await stripe.checkout.sessions.create(params);
    response.send({ message: "Successfully created payment seesion", data: session.id});
  })
  
  app.post('/checkout/success', async (req, res) => {
    console.log("line 191",req.body);
    const sessionId = req.body.session_id; // Get session_id from query parameters
      console.log("line 192",sessionId)
    if (!sessionId) {
        return res.status(400).send('Session ID is required');
    }

    try {
        // Retrieve session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Extract the total amount and other details from metadata
        const totalAmount = session.metadata.totalAmount;

        // Send the necessary data for the frontend to complete the purchase
        const data= {
          id: session.metadata.id,
          name: session.metadata.name,
          offerPrice: session.metadata.offerPrice / 100,
          quantity: session.metadata.quantity,
          owner: session.metadata.owner,
          totalAmount: session.metadata.totalAmount, // Send the total amount
          farmerName:session.metadata.farmerName,
          email:session.metadata.email
      }
      res.send({ message: "Successfully created payment seesion", data: data});
    } catch (error) {
        console.error('Error retrieving Stripe session:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/addCart", (request, response) => {
  addCart(request, response);
});

app.post("/fetchCartByUser", (request, response) => {
  fetchCartByUser(request, response);
});
app.post("/deleteCartByUser", (request, response) => {
  deleteCartByUser(request, response);
});
app.post("/updateCartById", (request, response) => {
  updateCartById(request, response);
});




app.listen(PORT, () => console.log("server is running at port : " + PORT));
