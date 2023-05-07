import express from "express";
import * as articleController from "../controllers/articleController.js"
const router  = express.Router();


router.post('/',articleController.createOneArticle);
router.patch('/:articleId',articleController.updateOneArticle);
router.delete('/:articleId',articleController.deleteOneArticle);
router.get('/:articleId',articleController.getOneArticle);
router.get('/',articleController.getAllArticles);


export default router;