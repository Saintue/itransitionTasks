import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {type:String, unique: true, required: true},
    email:{type:String, unique: true, required: true},
    password: {type: String, required: true},
    lastLogin: {type:String, default:"none"},
    regTime: {type:String, default: "none"},
    status: {type: Boolean, default:true},
})

export default mongoose.model("User", User)