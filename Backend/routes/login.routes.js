import { Router } from "express";
const router = Router();

import { searchUser, addUser } from "../controllers/loginController.js";

router.route("/api/users")
  .get(searchUser)
  .post(addUser);

export default router;