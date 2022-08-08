import { Router } from "express";
import {
  validateUser,
  checkForUser,
  validateUserSignin,
  auth
} from "../middleware/users.js";
import { addUser, getUser } from "../controllers/users.js";

const router = Router();

router.post("/users/signup", validateUser, addUser);
router.post("/users/auth/signin", validateUserSignin, getUser);
router.get("/user/:userId", auth, checkForUser, getUser);


export default router;