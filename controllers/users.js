import Users from "../models/Users.js";

export const addUser = async (req, res) => {
  const { fullName, email,shopName, password } = req.body;
  const user  = await Users.create({
    fullName,
    email,
    shopName,
    password,
    products: [],
  });
  return res.status(201).send({
    message: `${fullName} your account was created successfully`,
    data: user,
  });
};


export const getUser = (req, res,) => {
  res.status(200).send({
    message: "User found successfully",
    data: req.user,
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
