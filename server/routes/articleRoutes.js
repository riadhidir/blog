import express from "express";
import * as articleController from "../controllers/articleController.js"
import * as commentController from "../controllers/commentController.js"
import * as replyController from "../controllers/replyController.js"
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router  = express.Router();


router.post('/',verifyJWT,articleController.createOneArticle);
router.patch('/:articleId',articleController.updateOneArticle);
router.delete('/:articleId',articleController.deleteOneArticle);
router.get('/:articleId',articleController.getOneArticle);
router.get('/',articleController.getAllArticles);

//comments routes
router.post('/:articleId/comments',commentController.createComment);
router.get('/:articleId/comments',commentController.getComments);
router.patch('/:articleId/comments',commentController.updateComment);
router.delete('/:articleId/comments/:commentId',commentController.deleteComment);

//replies routes
router.post('/comments/:commentId/replies',replyController.createReply);
router.get('/comments/:commentId/replies',replyController.getReplies);
router.patch('/comments/:commentId/replies/:replyId',replyController.updateReply);
router.delete('/comments/:commentId/replies/:replyId',replyController.deleteReply);








export default router;