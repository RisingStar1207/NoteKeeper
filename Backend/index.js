const connection= require("./db");
const express= require("express");
var cors = require('cors');
connection();
require('dotenv').config();

const app=express();
const port= process.env.REACT_APP_PORT;

app.get("/",(req,res)=>{
    res.send("Jai Shree Ganesh");
})
app.use(cors())
app.use(express.json());
app.use("/api/auth",require("./Routers/Auth"));
app.use("/api/notes",require("./Routers/notes"));

app.listen(port,()=>{
    console.log(`The server is running on the port${port}`);
})
