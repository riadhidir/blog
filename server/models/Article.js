import mongoose from "mongoose";

const {Schema, model} = mongoose;

const articleSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    categories:[{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true
    }],
   
});

const Article  = new model("Article", articleSchema);
export default Article;