import Products from "../models/Products.js";
import Users from "../models/Users.js";

export const getAllProducts = async (req, res) => {
  const products = await Products.find();
  return res.status(200).send({
    message: "Products fetched successfully",
    data: products,
  });
};

export const getSingleProduct = (req, res) => {
  res.status(200).send({
    message: "Product fetched successfully",
    data: req.product,
  });
};

export const addProduct = async (req, res) => {
    console.log(req.user)
  const userId = req.user._id;
  const user = await Users.findOne({ _id: userId });
  const { name, quantity, price, status, category } = req.body;
  const product = await Products.create({
    name,
    quantity,
    price,
    status,
    category,
  });
  user.products.push(product);
  return res.status(201).send({
    message: "Product was successfully created",
    data: product,
  });
};

export const getProductByName = async (req, res) => {
  res.status(200).send({
    message: "Product fetched successfully",
    data: req.product,
  });
};

export const updateProduct = (req, res) => {
  const { product } = req;
  const { name, quantity, price, status, category } = req.body;
};

export const deleteProduct = (req, res) => {};
