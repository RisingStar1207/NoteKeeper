const mongoose= require("mongoose");
require('dotenv').config();

const connection = () => { mongoose.connect("mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.vgrepzn.mongodb.net/users", { useNewUrlParser: true }); }
module.exports=connection;
