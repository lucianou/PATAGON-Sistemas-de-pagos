import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js"

import{ getPatagonData} from "../controllers/interactionControllers.js"
import { newUserCreation , AllUsers, deletedUser} from "../controllers/UsersController.js";

const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

router.post("/new-user-creation", authenticateToken, authorizeRoles('Administrador'),newUserCreation);
router.post("/deleted-user",authenticateToken, authorizeRoles('Administrador'), deletedUser)
router.get("/users", authenticateToken, authorizeRoles('Administrador') ,AllUsers);


export {router as UserControlRouter}