const authorModel = require("../models/authorModel");
const pubModel = require("../models/publisherModel");
const bookModel = require("../models/bookModel");

// =======================================================
//1st
const createAuthor = async function(req,res){
    let data = req.body
    let authorData = await authorModel.create(data)
    res.send(authorData)
};

module.exports.createAuthor=createAuthor;

// =================================================================
//2nd
const createPublisher = async function(req,res){
    let pubdata = req.body
    let publisherData = await pubModel.create(pubdata)
    res.send(publisherData)
};

module.exports.createPublisher=createPublisher;

// =====================================================================
//3rd

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    //3 a)
    if(!authorId) {
        return res.send({message: "Author id must be present in the book detials"})   
    }

    //3 b)
    let author = await authorModel.findById(authorId)

    if(!author) {
        return res.send({message: "Not a valid author id"})
    }

    //3 c)
    if(!publisherId) {
        return res.send({message: "Publihser id must be present in the book details"})
    }

    //3 d)
    let publisher = await pubModel.findById(publisherId) 

    if(!publisher) {
        return res.send({message: "Not a valid publisher id"})
    }

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}
module.exports.createBook=createBook;
// const createBook = async function(req,res){
//     let bookdata = req.body

//     if(bookdata.author && bookdata.publisher){
//     let checkAuthorId = await authorModel.findById(bookdata.author);
//     let checkPublisherId = await pubModel.findById(bookdata.publisher);

//     if(checkAuthorId){

//         if(checkPublisherId){
//             let showData = await bookModel.create(bookdata);
//             res.send({data:showData , status: true});
//         }else{
//             res.send({msg: "Publisher Id is not vaild." , status: false});
//         }
//     }else{
//         res.send({msg : "Author Id is not vaild.", status: false});
//     }
   
//    }else{
//     res.send({msg : "Author Id & Publisher Id is required.", status: false});
//    }
 
// };

module.exports.createBook=createBook;

// =============================================================================
//4th
const getallData = async function(req,res){

    let allData = await bookModel.find().populate("author publisher")
    res.send({msg:allData})
};

module.exports.getallData=getallData;

// ==============================================================================
// 5(a)
 
const editBookData = async function (req,res) {
     
    let editdata = await bookModel.updateMany(
        {$or:[{"publisher":"625abc14a7bbc1ac45a7fce3"},{"publisher":"625b9f2b23b6e883ba632d72"}]},
         {$set: {"isHardCover": true}})
     
   res.send({msg:editdata})
}

module.exports.editBookData=editBookData;

// ==============================================================================
// 5(b)

const incBookData = async function (req,res) {
     
    let incpricedata = await bookModel.updateMany(
     {ratings:{$gt:3.5}},
     {$inc:{price:10}}
    );
        
     
   res.send({msg:incpricedata})
}

module.exports.incBookData=incBookData;


// ======================================================================



