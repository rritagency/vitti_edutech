const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Post', PostSchema);