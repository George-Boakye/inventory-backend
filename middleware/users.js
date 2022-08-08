import { userSignUpSchema, userSignInSchema } from "./validation.js";
import Users from "../models/Users.js";
import { comparePassword } from "../services/auth.js";
import  Jwt  from "jsonwebtoken";
import "dotenv/config";

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
  const valid =  await comparePassword(req.body.password, user.password);
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  if (!valid) {
    return res.status(404).send({
      message: "Incorrect email & password cobination",
    });
  }
  req.user = user;
  next();
};

export const checkForUser = async (req, res, next) => {
  const user = await Users.findById(req.params.userId);
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
export const auth  =  (req, res, next) => {
const {token} = req.headers
console.log(token)
const decoded = Jwt.verify(token,process.env.SECRET_KEY );
console.log(decoded)
if(!token){
  return res.status(400).send({
    message: "Access denied. No token was provided",
    data:null
  })
}
try {
  if(!decoded){
    return res.status(403).send({
      message:"You do not have the right access to this resource",
      data: null
    })
  }
  req.user = decoded
  next()
} catch (error) {
  console.log(error)
  return res.status(403).send({
    message:"You do not have the right access to this resource",
    data: null
  })
}
}