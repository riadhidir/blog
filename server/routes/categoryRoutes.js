import express from "express";
import * as categoryController from "../controllers/categoryController.js"
import verifyRoles from "../middlewares/verifyRoles.js"
import roles from "../config/roles.js";

const router  = express.Router();


router.post('/',verifyRoles(roles.ADMIN),categoryController.createOneCategory);
router.patch('/:categoryId',verifyRoles(roles.ADMIN),categoryController.updateOneCategory);
router.delete('/:categoryId',verifyRoles(roles.ADMIN),categoryController.deleteOneCategory);
// router.get('/:categoryId',);
router.get('/',verifyRoles(roles.ADMIN),categoryController.getAllCategories);


export default router;