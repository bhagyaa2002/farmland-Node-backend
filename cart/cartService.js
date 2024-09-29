import { cartModel } from "./cartModel.js";

export const addCart = async (request, response) => {
  console.log("inside cart service");

  try {
      const { email, cropName, Quantity } = request.body; // Assuming 'name' refers to the item name
      console.log("Request body: ", request.body);

      // Search for an existing cart item with the same email and name
      const existingCartItem = await cartModel.findOne({ email, cropName });

      if (existingCartItem) {
          // If the item exists, update the quantity by adding the new quantity to the existing one
          const numericQuantity = Number(Quantity);
          existingCartItem.Quantity += numericQuantity;
          const updatedItem = await existingCartItem.save();

          console.log("Item updated:", updatedItem);
          response.send({ message: "Quantity updated successfully", id: updatedItem._id });
      } else {
          // If the item does not exist, create a new record in the cart
          const newCartItem = new cartModel(request.body);
          const savedItem = await newCartItem.save();

          console.log("New item added:", savedItem);
          response.send({ message: "Item successfully added to cart", id: savedItem._id });
      }
  } catch (error) {
      console.error("Error in cart service:", error);
      response.status(500).send({ message: "Internal Server Error" });
  }
};


export const fetchCartById = async(request,response)=>{
  console.log("inside fetchCartById service");
  try {
      const { id } = request.body;
  
      const result = await cartModel.find({ _id: id }).sort({ createdAt: -1 });
  
        response.send({ message: "Successfully fetched cart for user", data:  result });
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


export const deleteCartById = async(request,response)=>{
  console.log("inside deleteCartByUser service");
  try {
    const { id } = request.body;
    
    if (!id) {
      return response.status(400).send({ message: "Email is required" });
    }

    // Delete all cart entries for the user
    const result = await cartModel.deleteOne({ _id: id });

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