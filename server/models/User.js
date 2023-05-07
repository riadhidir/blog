import mongoose from "mongoose";
import roles from "../config/roles.js";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    article: [{
        type : Schema.Types.ObjectId,
        ref:"Article"
    }],
    role :{
        type: String,
        enum:[roles.ADMIN, roles.USER],
        default: roles.USER
    },
    refreshToken : {
        type:String,
        default:""
    }
});

const User  = new model("User", userSchema);

export default User;