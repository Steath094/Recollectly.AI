import mongoose,{model} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    }
},{timestamps:true})


userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const tagSchema = new mongoose.Schema({
    title : String
})
const contentTypes = ['image', 'video', 'article', 'audio','document'];
const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
    },
    tags: [{type: mongoose.Types.ObjectId,ref:'Tag'}],
    types : {
        type: String,
        enum: contentTypes,
        required: true
    },
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
},{timestamps:true})
const linkSchema = new mongoose.Schema({
    hash : {
        type: String,
        required: true
    },
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
},{timestamps:true})


export const User = model("User", userSchema);
export const Tag = model("Tag", tagSchema);
export const Content = model("Content", contentSchema);
export const Link = model("Link", linkSchema);