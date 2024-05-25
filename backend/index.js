import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./utils/mongoDB.js";
import { signUp, getUserDetails,login,updateUserPasswordByEmail } from "./users/userService.js";

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
app.listen(PORT, () => console.log("server is running at port : " + PORT));
