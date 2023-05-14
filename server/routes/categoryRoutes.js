import express from "express";
import * as categoryController from "../controllers/categoryController.js"
import verifyRoles from "../middlewares/verifyRoles.js"
import roles from "../config/roles.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router  = express.Router();


router.post('/',verifyJWT,categoryController.createOneCategory);
router.patch('/:categoryId',verifyJWT,categoryController.updateOneCategory);
router.delete('/:categoryId',verifyJWT,categoryController.deleteOneCategory);
router.get('/:categoryId',verifyJWT,categoryController.getOneCategory);
router.get('/',verifyJWT,categoryController.getAllCategories);


export default router;