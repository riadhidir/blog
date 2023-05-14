import Comment from '../models/Comment.js';
import Reply from '../models/Reply.js';



export const createComment = async (req,res)=>{
    const articleID = req.params.articleId;
    const User = req.user;  
    const {comment} = req.body;
    try{
        const newComment = await Comment.create({user:User.id,article:articleID, comment});
        res.status(200).json(newComment);
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
}
export const deleteComment = async (req,res)=>{
    const commentID = req.params.commentId;
    try{
         await Comment.findByIdAndDelete(commentID);
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export const updateComment = async (req,res)=>{
    const commentID = req.params.commentId;
    const {comment} = req.body;
    try{
        const newComment = await Comment.findByIdAndUpdate(commentID,{comment},{returnDocument:'after'});
        res.status(200).json(newComment);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export const getComment = async (req,res)=>{
    const commentID = req.params.commentId;
    try{
        const Comment = await Comment.findById(commentID);
        if(!Comment) return res.status(404).json({message: "comment not found"});
        res.status(200).json(Comment);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export const getComments = async (req,res)=>{
    try{
        const comments = await Comment.find();
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json({message: err.message});
    }

}