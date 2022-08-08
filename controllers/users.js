import Users from "../models/Users.js";
import { generatePassword } from "../services/auth.js";
import  Jwt  from "jsonwebtoken";
import "dotenv/config";
import { responseHandler } from "../services/response.js";

export const addUser = async (req, res) => {
  try {
    const { fullName, email,shopName, password } = req.body;
    const {salt, hash} = await generatePassword(password);
    const user  = await Users.create({
      fullName,
      email,
      shopName,
      salt,
      password: hash,
      products: [],
    });
    return responseHandler(res, 201, "Account was created successfully", user)
    
  } catch (error) {
    return responseHandler(res, 400, "Email is taken",error)
  }
};


export const getUser = async (req, res,) => {
  try {
    const user = await Users.findById(req.user._id).populate({path:'products', populate:{path:'productId'}})
    const {_id, fullName, email, shopName} = user
    const token = Jwt.sign({_id, fullName, email, shopName},process.env.SECRET_KEY, {expiresIn: "1h"} )
    return responseHandler(res, 200, "User login successful", {user,token})
    
  } catch (error) {
    return responseHandler(res, 500, "User fetch failed", error)
  }
};


export const getUsers = async (req, res, )=>{
  try {
    const users = await Users.find();
    return responseHandler(res, 200, "Users fetched successfully", users)    
  } catch (error) {
    return responseHandler(res, 500, "Fetching users failed",error)
  }

}

// export const deleteUser = async (req, res)=>{
//   // const user = await Users.findOne({_id: localStorage.getItem('id')})
//   const deletedUser = await Users.findByIdAndDelete(_id)
// }
