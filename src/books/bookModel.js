const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{
        type : String,
        required : true
    } ,
    authorName: String,
    pubyear : Number,
    price : Number  
 
}, { timestamps: true });

module.exports = mongoose.model('User', bookSchema)



