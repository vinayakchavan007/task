const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique: [true, "Movie name must be unique"],
    },
    img: {
        type: String
    },
    summary: {
        type: String,
    }
})

const movie_details = new mongoose.model('movie_detail', movieSchema);

module.exports = movie_details;
