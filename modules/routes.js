const express = require("express");
const userRoutes = express.Router();
const Book = require("./schema");

userRoutes.get("/", async (req, res)=>{
    try{
        await Book.find().then(data => res.send(data))
        
    }catch(err){
        res.json(err.message)
    }
})


userRoutes.get("/t/:t", async (req, res)=>{
    
    try{
        await Book.find({title: req.params.t}).then(data => res.send(data))
        
    }catch(err){
        res.json(err.message)
    }
})

userRoutes.get("/a/:a", async (req, res)=>{
    
    try{
        await Book.find({title: req.params.a}).then(data => res.send(data))
        
    }catch(err){
        res.json(err.message)
    }
})

userRoutes.get("/b/:b", async (req, res)=>{
    
    try{
        await Book.find({ $or: [ { title: req.params.b }, { author: req.params.b } ] }).then(data => res.send(data))
        
    }catch(err){
        res.json(err.message)
    }
})


module.exports = userRoutes;