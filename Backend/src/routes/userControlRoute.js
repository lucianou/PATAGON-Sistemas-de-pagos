import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js"

import{ getPatagonData} from "../controllers/interactionControllers.js"

import { newUserCreation , AllUsers, deletedUser, insertUserRole, getAdminsRole} from "../controllers/UsersController.js";


const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

router.post("/insert-user-role", authenticateToken, authorizeRoles('Administrador'),insertUserRole);
router.post("/new-user-creation", authenticateToken, authorizeRoles('Administrador'),newUserCreation);
router.post("/deleted-user",authenticateToken, authorizeRoles('Administrador'), deletedUser)
router.get("/users", authenticateToken, authorizeRoles('Administrador') ,AllUsers);
router.get("/get-admins-role" , authenticateToken, authorizeRoles('Administrador') ,getAdminsRole);


export {router as UserControlRouter}