const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8080;


console.log("Backend port",PORT );
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database : "+process.env.MONGODB_URL))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Server is running");
  });
app.listen(PORT, () => console.log("server is running at port : " + PORT));
