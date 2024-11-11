import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/authenticateToken.js"
import{ getPatagonData} from "../controllers/interactionControllers.js"
import { newUserCreation , AllUsers, deletedUser, insertUserRole, getAdminsRole, deleteAdminsRoles} from "../controllers/UsersController.js";
import { newUserCreationPatagon , rejectRequest} from "../controllers/patagonController.js";

const router = express.Router();

//rutas protegidas
router.get("/",authenticateToken, getPatagonData);

router.post("/insert-user-role", authenticateToken, authorizeRoles('Administrador'),insertUserRole);
router.post("/new-user-creation", authenticateToken, authorizeRoles('Administrador'),newUserCreation);
router.post("/deleted-user", deletedUser);
router.get("/users", authenticateToken, authorizeRoles('Administrador', 'Co-admin') ,AllUsers);
router.get("/get-admins-role" , authenticateToken, authorizeRoles('Administrador') ,getAdminsRole)

router.post("/delete-admins-roles", deleteAdminsRoles);
router.post("/new-user-creation-patagon", newUserCreationPatagon);
router.post("/reject-request", rejectRequest);


export {router as UserControlRouter}