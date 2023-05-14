
import Reply from '../models/Reply.js';



export const createReply = async (req,res)=>{
    const commentID = req.params.commentId;
    const User = req.user;  
    const {reply} = req.body;
    try{
        const newReply = await Reply.create({user:User.id,comment:commentID, reply});
        res.status(200).json(newReply);
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
}
export const deleteReply = async (req,res)=>{
    const replyID = req.params.replyId;
    try{
         await Reply.findByIdAndDelete(replyID);
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export const updateReply = async (req,res)=>{
    const replyID = req.params.replyId;
    const {reply} = req.body;
    try{
        const newReply = await Reply.findByIdAndUpdate(replyID,{reply},{returnDocument:'after'});
        res.status(200).json(newReply);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
// export const getReply = async (req,res)=>{
//     const commentID = req.params.commentId;
//     try{
//         const Comment = await Comment.findById(commentID);
//         if(!Comment) return res.status(404).json({message: "comment not found"});
//         res.status(200).json(Comment);
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// }
export const getReplies = async (req,res)=>{
    try{
        const replies = await Reply.find();
        res.status(200).json(replies);
    }catch(err){
        res.status(500).json({message: err.message});
    }

}