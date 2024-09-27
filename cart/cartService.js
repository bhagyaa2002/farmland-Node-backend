import { cartModel } from "./cartModel.js";

export const addCart = async(request,response)=>{
    console.log("inside cart service upload service");
  try {
    console.log("line 6", request.body);
      const data = new cartModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully uploaded to cart service", id: save._id });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }

}

export const fetchCartByUser = async(request,response)=>{
    console.log("inside fetchCartByUser service");
    try {
        const { email } = request.body;
    
        const result = await cartModel.find({ email: email }).sort({ createdAt: -1 });
    
          response.send({ message: "Successfully fetched cart for user", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const fetchCartBySeller = async(request,response)=>{
    console.log("inside fetchCartBySeller service");
    try {
        const { soldBy } = request.body;
    
        const result = await cartModel.find({ soldBy: soldBy });
    
        response.send({ message: "Successfully fetched cart for seller", data:  result });
      } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Internal Server Error" });
      }
}

export const deleteCartByUser = async(request,response)=>{
  console.log("inside deleteCartByUser service");
  try {
    const { email } = request.body;
    
    if (!email) {
      return response.status(400).send({ message: "Email is required" });
    }

    // Delete all cart entries for the user
    const result = await cartModel.deleteMany({ email: email });

    if (result.deletedCount > 0) {
      response.send({ message: "Successfully deleted cart for user", data: result });
    } else {
      response.status(404).send({ message: "No cart found for the user" });
    }
    
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
}


export const updateCartById = async (request, response) => {
  console.log("inside updateCartById service");
  try {
    const { id, ...cartData } = request.body; // Extract id and the remaining cart data from the body

    if (!id) {
      return response.status(400).send({ message: "Cart ID is required" });
    }

    // Update the cart by ID and return the updated cart
    const updatedCart = await cartModel.findByIdAndUpdate(id, cartData, { new: true });

    if (updatedCart) {
      response.send({ message: "Successfully updated cart", data: updatedCart });
    } else {
      response.status(404).send({ message: "Cart not found" });
    }

  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
}; 




// export const getAllFertilizerOrderTransaction = async (request, response) => {
//   console.log("inside get all fertilizer Order service");
//   try {

//       const fertilizerOrder = await fertilizerOrderHistoryModel.find();
//       response.send({ message: "Successfully fetched all fertilizerOrder", data: fertilizerOrder });
//   } catch (error) {
//       console.error(error);
//       response.status(500).send({ message: "Internal Server Error" });
//   }
// };