const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        default:new Date()
    }
});

module.exports= mongoose.model("User",userSchema);