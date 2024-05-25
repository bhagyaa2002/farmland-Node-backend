import mongoose from "mongoose";

export const mongoConnection = ()=>{
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database : "+process.env.MONGODB_URL))
  .catch((err) => console.log(err));
}
