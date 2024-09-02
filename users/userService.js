import { userModel } from "./userModel.js";
import e, { request, response } from "express";
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';


const generateRandomPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

 const sendNewPasswordEmail = async (email, newPassword) => {
  console.log("line 18 inside password reset", email, newPassword);
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail, Outlook, etc.
    auth: {
      user: 'bhagyaammenadka@gmail.com', // Replace with your email
      pass: 'nmmx oabx kzll gyya', // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'bhagyaammenadka@gmail.com',
    to: email,
    subject: 'Your New Password',
    text: `Your new password is: ${newPassword}`,
  };

  await transporter.sendMail(mailOptions);
};

export const forgotPassword = async (request, response) => {
  console.log("inside forgot password service");
  try {
    const { email, phone } = request.body;

    // Find user by email and phone
    const user = await userModel.findOne({ email: email, phoneNo: phone });

    if (!user) {
      response.status(404).send({ message: "User not found or phone number does not match" });
      return;
    }

    // Generate new password
    const newPassword = generateRandomPassword();

    // Encrypt the new password
    const encryptedPassword = CryptoJS.AES.encrypt(newPassword, 'your-secret-key').toString();

    // Update user's password in the database
    user.password = encryptedPassword;
    await user.save();

    // Send the new password to the user's email
    await sendNewPasswordEmail(email, newPassword);

    response.send({ message: "New password sent to your email address" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
};

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
      response.send({ message: "success", id: save._id });
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
        const bytes = CryptoJS.AES.decrypt(password, 'your-secret-key');
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        const bytes1 = CryptoJS.AES.decrypt(result.password, 'your-secret-key');
        const dbPassword = bytes1.toString(CryptoJS.enc.Utf8);
        console.log("line 62",originalPassword);
        console.log("line 62",dbPassword);
        
        if (originalPassword === dbPassword) {
          const userInfo = {
            _id: result._id,
            user_name: result.user_name,
            shop: result.shop,
            email: result.email,
            city: result.city,
            location: result.location,
            phoneNo: result.phoneNo,
            user_type: result.user_type,
          };

          response.send({
            message: "success",
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
        response.send({
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
