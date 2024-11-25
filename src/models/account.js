const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    }
    });