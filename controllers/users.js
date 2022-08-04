import Users from "../models/Users.js";
import { generatePassword } from "../services/auth.js";

export const addUser = async (req, res) => {
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
  return res.status(201).send({
    message: `${fullName} your account was created successfully`,
    data: user,
  });
};


export const getUser = async (req, res,) => {
  const user = await Users.findById(req.user._id).populate({path:'products', populate:{path:'productId'}})
  res.status(200).send({
    message: "User found successfully",
    data: user,
  });

};

export const getUsers = async (req, res, )=>{
  const users = await Users.find();
  return res.status(200).send({
    message: "Users fetched successfully",
    data: users,
  })

}

// export const deleteUser = async (req, res)=>{
//   // const user = await Users.findOne({_id: localStorage.getItem('id')})
//   const deletedUser = await Users.findByIdAndDelete(_id)
// }
