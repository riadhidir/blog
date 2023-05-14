import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const commentSchema = new Schema({


      user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    article:{
        type:Schema.Types.ObjectId,
        ref:"Article",
        required:true
    },
    comment : {
        type:String,
        required:true,
    },


},{timestamps:true});

const Comment = new model('Comment',commentSchema);
export default Comment;