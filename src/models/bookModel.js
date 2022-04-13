const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
        require : true,
    },
    authorName: String,
    price : {
        indianPrice : String,
        europeanPrice : String,
    },
    tags : [String],
    year : {
        type : Number,
        default : 2021,
    },
    totalPages : Number,
    stockAvailable : Boolean,
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) 



























