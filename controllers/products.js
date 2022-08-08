import Products from "../models/Products.js";
import Users from "../models/Users.js";
import { responseHandler } from "../services/response.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    responseHandler(res, 200, "Product fetched successfully", products);
  } catch (error) {
    return responseHandler(res, 500, "Products could not be fetched",error);
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.product._id).populate("user");
    return responseHandler(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return responseHandler(res, 500, "Product fetch failed",error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const userId = req.params.userID;
    const user = await Users.findById(userId);
    const { name, quantity, price, status, category } = req.body;
    const product = await Products.create({
      name,
      quantity,
      price,
      status,
      category,
      user: userId,
    });
    const addedProduct = await Users.updateOne(
      { _id: user._id },
      { $push: { products: { productId: product._id } } }
    );
    return responseHandler(
      res,
      201,
      "Product was successfully created",
      addedProduct
    );
  } catch (error) {
    return responseHandler(res, 400, "Product creation failed",error);
  }
};

export const getProductByName = async (req, res) => {
  res.status(200).send({
    message: "Product fetched successfully",
    data: req.product,
  });
};

export const updateProduct = async (req, res) => {
  try {
    const { name, quantity, price, status, category } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price, status, category }
    );
    return responseHandler(res, 200, "Product updated successfully", updatedProduct)  
  } catch (error) {
    return responseHandler(res, 400, "Product update failed" )
  }
};

export const deleteProduct = async (req, res) => {
  try {
   const deletedProduct =  await Products.findByIdAndDelete(req.params.id);
   return responseHandler(res, 200, "Product deleted", deletedProduct)
  } catch (error) {
    return responseHandler(res, 500, "Product deletion failed", error)
  }
};
