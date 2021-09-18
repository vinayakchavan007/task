var express = require('express');
var router = express.Router();
const url= require("../config/database");
const movies_Schema= require("../schema/schema");

router.get("/movies_details", async (req, res) => {
    try{
        const moviesData = await movies_Schema.find();
        res.send(moviesData);
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post("/movies_details/upload", async (req, res) => {
    try{
        const movie = new movies_Schema(req.body);
        console.log(movie);
        const createMovie = await movie.save();
        res.status(201).send(createMovie);
    }
    catch(err){
        res.status(400).json({
            message: "Error in adding data"
        });
    }
});

router.patch("/movies_details/:id", checkId, async (req, res) => {
    try{
        const _id =req.params.id;
        const updateData = await movies_Schema.findByIdAndUpdate(
            _id, 
            req.body, 
            {
                useFindAndModify: false,
                new: true
            }
        ); 
        res.send(updateData);
    }
    catch(err){
        res.status(500).send(err);
    }
});

async function checkId(req, res, next){
    try{
        const _id =req.params.id;
        const moviesData = await movies_Schema.find({_id});
        console.log(moviesData)
    
        if(moviesData.length <= 0){
            res.status(401).json({
                message : "id not found"
            });
        }
        else{
            next();
        }
    }
    catch(error){
        res.status(501).json({
            message : "error"
        })
    }


}

router.delete("/movies_details/delete/:id", async (req, res) => {
    try{
        const _id =req.params.id;
        const deleteData = await movies_Schema.findByIdAndDelete(_id); 
        
        if(!_id){
            res.status(404).send();
        }
        else{
            res.send(deleteData);
        }
    }
    catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;