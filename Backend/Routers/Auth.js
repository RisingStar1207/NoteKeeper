const express = require("express");
const User = require("../Models/Users");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require("../Middleware/fetchuser");
require('dotenv').config();

var JWT_secret = process.env.REACT_APP_JWT_SECRET;

//Route1: To get the user signup using Post request
router.post("/signup", [body('email').isEmail().withMessage('Not a valid e-mail address'), body('name').isLength({ min: 5 }).withMessage("Not a valid Username"), body('password').isLength({ min: 7 }).withMessage("Not a valid Password")], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "The email Id is already registered" })
        }
        var salt = bcrypt.genSaltSync(10);
        var secPassword = bcrypt.hashSync(req.body.password, salt);
        user = new User({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });
        user.save();
        var data={
            user:{
                id:user.id
            }
        }
        var authToken = jwt.sign(data, JWT_secret);
        res.json({authToken});
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Some error has occured");
    }
})

//Route2: to login a user using Post request
router.post("/login", [body('email').isEmail().withMessage('Galat email'),body('password').isLength({ min: 1 }).withMessage("Password chota")], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try{
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: "Email nahi mila" })
        }
        const comparePass = await bcrypt.compare(req.body.password,user.password);
        if(!comparePass){
            return res.status(400).json({ error: "Galat Password" })
        }
        var data={
            user:{
                id:user.id
            }
        }
        var authToken = jwt.sign(data, JWT_secret);
        res.json({authToken});
    }
    catch(err){
        console.log(error);
        res.status(500).json({error:"Some error has occured"});
    }
})

//Route3: to get the user details using Post request
router.post("/getuser",fetchUser ,async (req, res) => {
    try {
        var userId= req.user.id;
        var user = await User.findById(userId);
        res.json({user});
    } catch (error) {
        res.status(500).json({error:"Some error has occured"});
    }
})
module.exports = router;