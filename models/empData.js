const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    
    unique_id: Number,
    eid: {
        type: String,
        trim: true,
        required: true
    },
    fname: {
        type: String,
        trim: true,
        required: true
    },
    lname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    }


})

const emp = mongoose.model('emp', empSchema)

module.exports = emp