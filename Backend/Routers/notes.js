const express = require("express");
const Notes = require("../Models/Notes");
const router = express.Router();
var fetchUser = require("../Middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route1
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    var notes = await Notes.find({ user: req.user.id });
    res.json({ notes });
})
//Route2
router.post("/addnotes", fetchUser, [body('title').isLength({ min: 5, max: 20 }).withMessage('Should be more than 5 letters and less than 20 letters'), body('description').isLength({ min: 10, max: 250 }).withMessage('Should be more than 5 letters and less than 20 letters'), body('description').isLength({ min: 10, max: 250 }).withMessage('Should be more than 10 letters and less than 250 letters')], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        var newNotes = new Notes({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            user: req.user.id
        })
        newNotes.save();
        return res.json(newNotes);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
})
//Route3
router.put("/updatenotes/:id", fetchUser, [body('title').isLength({ min: 5, max: 20 }).withMessage('Should be more than 5 letters and less than 20 letters'), body('description').isLength({ min: 10, max: 250 }).withMessage('Should be more than 10 letters and less than 250 letters'),], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        var notes = await Notes.findOne({ _id: req.params.id });
        if (notes.user.toString() !== req.user.id) {
            return res.json({ error: "You are not eligible to make the challange" });
        }
        var updateNotes = await Notes.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
            }
        });
        return res.json(updateNotes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
})
//Route4
router.delete("/deleteNotes/:id",fetchUser,async(req,res)=>{
    try {
        var notes = await Notes.findOne({ _id: req.params.id });
        if(!notes){
            return res.status(404).send("404:Not Found!!");
        }
        if (notes.user.toString() !== req.user.id) {
            return res.json({ error: "You are not eligible to delete the Note" });
        }
        var deleteNotes = await Notes.findByIdAndDelete(req.params.id);
        return res.json(deleteNotes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
})
module.exports = router;