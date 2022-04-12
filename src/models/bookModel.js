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


module.exports = mongoose.model('Book', bookSchema) //books



























    // bookName: {
    //     type: 'String',
    //     require : 'true'
    // } ,
    // authorName: String, 
    // tags: [String],
    // year: 
    // isPublished: Boolean,
    // prices: {
    //     indianPrice: String,
    //     europePrice: String,
    // },
    // sales: {type: Number, default: 10}


//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
