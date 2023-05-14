import mongoose from "mongoose";

const {Schema,model} = mongoose;

const replySchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        required:true
    },
    reply : {
        type:String,
        required:true,
    },


},  { timestamps: true });

const Reply = model('Reply',replySchema);
export default Reply;