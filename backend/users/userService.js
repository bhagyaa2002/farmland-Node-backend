import { userModel } from "./userModel.js";
import e, { request, response } from "express";

export const signUp = async (request, response) => {
  console.log("inside signup service");
  try {
    const { email } = request.body;

    const result = await userModel.findOne({ email: email });

    if (result) {
      response.send({ message: "Email id is already registered" });
    } else {
      const data = new userModel(request.body);
      const save = await data.save();
      response.send({ message: "Successfully signed up", id: save._id });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
};

export const getUserDetails = async (request, response) => {
  console.log("inside getuserDetails service");
  try {
    const { email } = request.body;
    const result = await userModel.findOne({ email: email });
    if (result) {
      const userInfo = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        city: result.city,
        state: result.state,
        phone: result.phone,
        userType: result.userType,
      };
      response.send({ message: "User found", data: userInfo });
    } else {
      response
        .status(404)
        .send({ message: "User not found for the given email id: " + email });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (request, response) => {
  console.log("inside login service");
  try {
    const { email, password } = request.body;
    userModel
      .findOne({ email: email })
      .then((result) => {
        if (password === result.password) {
          const userInfo = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            city: result.city,
            state: result.state,
            phone: result.phone,
            userType: result.userType,
          };

          response.send({
            message: "Login Successful",
            data: userInfo,
          });
        } else {
          response.send({
            message: "Invalid Password",
            data: {},
          });
        }
      })
      .catch((error) => {
        response.status(404).send({
          message: "This email is not available,Please sign up",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateUserPasswordByEmail = async (request, response) => {
  console.log("inside reset password service");
  try {
    const { email, newPassword } = request.body;
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { runValidators: true } // Options: return updated document, run validators
    );
    if (updatedUser === null) {
      response.send({ message: "User not found" });
    } else {
      response.send({
        message: "User password updated for the emailid: " + updatedUser.email,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Error updating the user" });
  }
};
