import express from "express";
import {login,refreshLogin,logout,register,getMe} from "../controllers/userController.js"
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router  = express.Router();


router.post('/auth',login);
router.post('/register',register);
router.get('/refresh',refreshLogin);
router.get('/:userId',verifyJWT,getMe);
router.patch('/logout',logout);

export default router;