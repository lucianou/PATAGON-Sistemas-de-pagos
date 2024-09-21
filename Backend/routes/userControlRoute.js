import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js"

import{ getPatagonData} from "../controllers/interactionControllers.js"
import { newUserCreation , AllUsers, deletedUser} from "../controllers/newUserController.js";

const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

router.post("/new-user-creation", newUserCreation);
router.post("/deleted-user", deletedUser)
router.get("/users", AllUsers);


export {router as UserControlRouter}