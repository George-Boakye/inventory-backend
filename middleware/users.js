import { userSignUpSchema, userSignInSchema } from "./validation.js";
import Users from "../models/Users.js";

export const validateUser = async (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body);
  const user = await Users.findOne({email: req.body.email});
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  if (user) {
    return res.status(400).send({
      message: "User with the same email already exist",
    });
  }
  next();
};

export const validateUserSignin = async (req, res, next) => {
  const { error } = userSignInSchema.validate(req.body);
  const user = await Users.findOne({email: req.body.email});
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  if (user) {
    if (user.password !== req.body.password) {
      return res.status(400).send({
        message: "Incorrect Password",
      });
    }
  }
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  req.user = user;
  next();
};

export const checkForUser = async (req, res, next) => {
  const user = await Users.find({name:req.params.userId});
  if (!user) {
    return res.status(404).send({
      message: "User not found",
      data: null,
    });
  }
  req.user = user;
  next();
};

export const validateCompany = (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  next();
};
